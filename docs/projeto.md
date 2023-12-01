---

layout: doc
---

# Diagrama

## Diagrama de Caso de Uso

![Diagrama de Caso de Uso](/assets/diagrama.png)


## Explicação

Essa é a estrutura do projeto, basicamente o usuario irá fazer a requisição para o load balancer, que irá distribuir a requisição para as instâncias EC2, que irão se comunicar com o banco de dados RDS.

## Código
###### O codigo completo está no repositorio do github, o link está no final da pagina.

<Badge type="warning" text="O codigo foi separado em pastas, cada pasta é um modulo, e cada modulo tem seu codigo separado em arquivos. Na main são chamadas esses modulos, e é feita a integração entre eles." />


### VPC
Logo abaixo temos o codigo do modulo VPC, que é responsavel por criar a VPC, subnets, internet gateway, route table, security group, etc.
No codigo abaixo temos a criação da VPC, com o bloco de endereço

```terraform
resource "aws_vpc" "project_vpc" {
  cidr_block           = "10.0.0.0/16"  //bloco de endereço
  enable_dns_hostnames = true          // configurar uma abela de hosts e rotas 
  enable_dns_support   = true

  tags = {
    Name = "${var.application_name}_public_vpc"
  }
}
```

Abaixo temos a criação da subnet publica, que é onde ficará o load balancer, e a subnet privada, onde ficarão as instancias EC2.

```terraform
resource "aws_subnet" "public_subnet_a" {
  vpc_id            = aws_vpc.project_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.application_name}_public_subnet_a"
  }
}
```
Existem outros codigos, como a criação do internet gateway, route table, security group, etc, mas não irei colocar aqui para não ficar muito extenso.


### EC2
Logo abaixo temos o codigo do modulo EC2, que é responsavel por criar as instancias EC2, e o load balancer.

```terraform
resource "aws_autoscaling_group" "project_asg" {
  name       = "${var.application_name}_asg"

  lifecycle {
    create_before_destroy = true
  }
  launch_template {
    id      = aws_launch_template.project_launch_template.id
    version = "$Latest"
  }
  target_group_arns         = [aws_lb_target_group.lb_target_group.arn] //preciso informar o target group
  min_size                  = 1
  max_size                  = 5
  desired_capacity          = 1
  vpc_zone_identifier       = var.public_subnets
  health_check_type         = "EC2"
  health_check_grace_period = 300
  force_delete              = true
  tag {
    key                 = "Name"
    value               = "${var.application_name}_asg"
    propagate_at_launch = true
  }

}
```

Abaixo temos a criação do load balancer, que é responsavel por distribuir as requisições para as instancias EC2.
É preciso informar o target group, que é onde estão as instancias EC2.


### RDS

Logo abaixo temos o codigo do modulo RDS, que é responsavel por criar o banco de dados RDS.

```terraform
resource "aws_db_instance" "project_db" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  username               = "admin"
  password               = "admin123"
  db_name                = "hudson_db"
  skip_final_snapshot    = true
  multi_az               = true
  backup_retention_period = 7
  vpc_security_group_ids = [aws_security_group.project_sg_db.id]
  db_subnet_group_name   = aws_db_subnet_group.project_db_subnet_group.name
  tags = {
    Name = "${var.application_name}_db"
  }

}
```
O banco de dados é criado com o tipo de armazenamento gp2, que é o tipo de armazenamento padrão da AWS, e com o tipo de instancia db.t2.micro, que é a instancia mais simples da AWS.
Atente-se para o parametro multi_az, que é responsavel por criar uma replica do banco de dados em outra zona de disponibilidade, para garantir a alta disponibilidade do banco de dados.
O banco também foi colocado em uma subnet privada, para garantir a segurança do banco de dados.

### IAM

Logo abaixo temos o codigo do modulo IAM, que é responsavel por criar as roles e policies necessarias para o projeto.

```terraform
resource "aws_iam_role" "this" {
  name = "${var.application_name}_role"
  assume_role_policy = jsonencode(
    {
      Version =  "2012-10-17",
      Statement = [
        {
          Action = "sts:AssumeRole",
          Principal = {
            Service = "ec2.amazonaws.com"
          },
          Effect = "Allow"
        }
      ]
    }
  )
}
```	
É preciso criar uma role para as instancias EC2, para que elas possam se comunicar com o banco de dados RDS, e também é preciso criar uma role para o load balancer, para que ele possa se comunicar com as instancias EC2.

### CloudWatch

Logo abaixo temos o codigo do modulo CloudWatch, que é responsavel por criar as metricas e alarmes necessarios para o projeto.

```terraform
resource "aws_autoscaling_policy" "asg_policy_up" {
  name                   = "my-asg-policy"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.project_asg.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 10.0
  }
  
}
resource "aws_autoscaling_policy" "asg_policy_down" {
  name                   = "my-asg-policy"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.project_asg.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 5.0
  }
  
}
```

É preciso criar metricas e alarmes para o load balancer, para que ele possa escalar as instancias EC2 de acordo com a demanda.
No codigo acima temos a criação de metricas e alarmes para escalar as instancias EC2 para cima e para baixo, de acordo com a demanda.
A ideia é que quando a CPU das instancias EC2 estiver acima de 10%, o load balancer irá escalar as instancias EC2 para cima, e quando a CPU das instancias EC2 estiver abaixo de 5%, o load balancer irá escalar as instancias EC2 para baixo.(Colocado um valor baixo para fins de teste).Utilizei a métrica de envio de email com o SNS, para que eu receba um email quando o alarme for acionado, mas não irei colocar o codigo aqui para não ficar muito extenso.




<a href="/etapas" style="display: inline-block; padding: 10px 20px; background-color: #4285f4; color: #ffffff; text-decoration: none; border-radius: 5px;">Página Anterior</a>