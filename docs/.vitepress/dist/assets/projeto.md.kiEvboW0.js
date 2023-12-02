import{_ as n,D as e,o as p,c as o,I as i,R as a,a4 as t}from"./chunks/framework.n2gXG5Fs.js";const v=JSON.parse('{"title":"Diagrama","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"projeto.md","filePath":"projeto.md"}'),l={name:"projeto.md"},c=a('<h1 id="diagrama" tabindex="-1">Diagrama <a class="header-anchor" href="#diagrama" aria-label="Permalink to &quot;Diagrama&quot;">​</a></h1><h2 id="diagrama-de-caso-de-uso" tabindex="-1">Diagrama de Caso de Uso <a class="header-anchor" href="#diagrama-de-caso-de-uso" aria-label="Permalink to &quot;Diagrama de Caso de Uso&quot;">​</a></h2><p><img src="'+t+'" alt="Diagrama de Caso de Uso"></p><h2 id="explicacao" tabindex="-1">Explicação <a class="header-anchor" href="#explicacao" aria-label="Permalink to &quot;Explicação&quot;">​</a></h2><p>Essa é a estrutura do projeto, basicamente o usuario irá fazer a requisição para o load balancer, que irá distribuir a requisição para as instâncias EC2, que irão se comunicar com o banco de dados RDS.</p><h2 id="codigo" tabindex="-1">Código <a class="header-anchor" href="#codigo" aria-label="Permalink to &quot;Código&quot;">​</a></h2><h6 id="o-codigo-completo-esta-no-repositorio-do-github-o-link-esta-no-final-da-pagina" tabindex="-1">O codigo completo está no repositorio do github, o link está no final da pagina. <a class="header-anchor" href="#o-codigo-completo-esta-no-repositorio-do-github-o-link-esta-no-final-da-pagina" aria-label="Permalink to &quot;O codigo completo está no repositorio do github, o link está no final da pagina.&quot;">​</a></h6>',7),r=a(`<h3 id="vpc" tabindex="-1">VPC <a class="header-anchor" href="#vpc" aria-label="Permalink to &quot;VPC&quot;">​</a></h3><p>Logo abaixo temos o codigo do modulo VPC, que é responsavel por criar a VPC, subnets, internet gateway, route table, security group, etc. No codigo abaixo temos a criação da VPC, com o bloco de endereço</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_vpc&quot; &quot;project_vpc&quot; {</span></span>
<span class="line"><span>  cidr_block           = &quot;10.0.0.0/16&quot;  //bloco de endereço</span></span>
<span class="line"><span>  enable_dns_hostnames = true          // configurar uma abela de hosts e rotas </span></span>
<span class="line"><span>  enable_dns_support   = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  tags = {</span></span>
<span class="line"><span>    Name = &quot;\${var.application_name}_public_vpc&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Abaixo temos a criação da subnet publica, que é onde ficará o load balancer, e a subnet privada, onde ficarão as instancias EC2.</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_subnet&quot; &quot;public_subnet_a&quot; {</span></span>
<span class="line"><span>  vpc_id            = aws_vpc.project_vpc.id</span></span>
<span class="line"><span>  cidr_block        = &quot;10.0.1.0/24&quot;</span></span>
<span class="line"><span>  availability_zone = &quot;us-east-1a&quot;</span></span>
<span class="line"><span>  map_public_ip_on_launch = true</span></span>
<span class="line"><span>  tags = {</span></span>
<span class="line"><span>    Name = &quot;\${var.application_name}_public_subnet_a&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Existem outros codigos, como a criação do internet gateway, route table, security group, etc, mas não irei colocar aqui para não ficar muito extenso.</p><h3 id="ec2" tabindex="-1">EC2 <a class="header-anchor" href="#ec2" aria-label="Permalink to &quot;EC2&quot;">​</a></h3><p>Logo abaixo temos o codigo do modulo EC2, que é responsavel por criar as instancias EC2, e o load balancer.</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_autoscaling_group&quot; &quot;project_asg&quot; {</span></span>
<span class="line"><span>  name       = &quot;\${var.application_name}_asg&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  lifecycle {</span></span>
<span class="line"><span>    create_before_destroy = true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  launch_template {</span></span>
<span class="line"><span>    id      = aws_launch_template.project_launch_template.id</span></span>
<span class="line"><span>    version = &quot;$Latest&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  target_group_arns         = [aws_lb_target_group.lb_target_group.arn] //preciso informar o target group</span></span>
<span class="line"><span>  min_size                  = 1</span></span>
<span class="line"><span>  max_size                  = 5</span></span>
<span class="line"><span>  desired_capacity          = 1</span></span>
<span class="line"><span>  vpc_zone_identifier       = var.public_subnets</span></span>
<span class="line"><span>  health_check_type         = &quot;EC2&quot;</span></span>
<span class="line"><span>  health_check_grace_period = 300</span></span>
<span class="line"><span>  force_delete              = true</span></span>
<span class="line"><span>  tag {</span></span>
<span class="line"><span>    key                 = &quot;Name&quot;</span></span>
<span class="line"><span>    value               = &quot;\${var.application_name}_asg&quot;</span></span>
<span class="line"><span>    propagate_at_launch = true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Abaixo temos a criação do load balancer, que é responsavel por distribuir as requisições para as instancias EC2. É preciso informar o target group, que é onde estão as instancias EC2.</p><h3 id="rds" tabindex="-1">RDS <a class="header-anchor" href="#rds" aria-label="Permalink to &quot;RDS&quot;">​</a></h3><p>Logo abaixo temos o codigo do modulo RDS, que é responsavel por criar o banco de dados RDS.</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_db_instance&quot; &quot;project_db&quot; {</span></span>
<span class="line"><span>  allocated_storage      = 20</span></span>
<span class="line"><span>  storage_type           = &quot;gp2&quot;</span></span>
<span class="line"><span>  engine                 = &quot;mysql&quot;</span></span>
<span class="line"><span>  engine_version         = &quot;5.7&quot;</span></span>
<span class="line"><span>  instance_class         = &quot;db.t2.micro&quot;</span></span>
<span class="line"><span>  username               = &quot;admin&quot;</span></span>
<span class="line"><span>  password               = &quot;admin123&quot;</span></span>
<span class="line"><span>  db_name                = &quot;hudson_db&quot;</span></span>
<span class="line"><span>  skip_final_snapshot    = true</span></span>
<span class="line"><span>  multi_az               = true</span></span>
<span class="line"><span>  backup_retention_period = 7</span></span>
<span class="line"><span>  vpc_security_group_ids = [aws_security_group.project_sg_db.id]</span></span>
<span class="line"><span>  db_subnet_group_name   = aws_db_subnet_group.project_db_subnet_group.name</span></span>
<span class="line"><span>  tags = {</span></span>
<span class="line"><span>    Name = &quot;\${var.application_name}_db&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>O banco de dados é criado com o tipo de armazenamento gp2, que é o tipo de armazenamento padrão da AWS, e com o tipo de instancia db.t2.micro, que é a instancia mais simples da AWS. Atente-se para o parametro multi_az, que é responsavel por criar uma replica do banco de dados em outra zona de disponibilidade, para garantir a alta disponibilidade do banco de dados. O banco também foi colocado em uma subnet privada, para garantir a segurança do banco de dados.</p><h3 id="iam" tabindex="-1">IAM <a class="header-anchor" href="#iam" aria-label="Permalink to &quot;IAM&quot;">​</a></h3><p>Logo abaixo temos o codigo do modulo IAM, que é responsavel por criar as roles e policies necessarias para o projeto.</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_iam_role&quot; &quot;this&quot; {</span></span>
<span class="line"><span>  name = &quot;\${var.application_name}_role&quot;</span></span>
<span class="line"><span>  assume_role_policy = jsonencode(</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      Version =  &quot;2012-10-17&quot;,</span></span>
<span class="line"><span>      Statement = [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          Action = &quot;sts:AssumeRole&quot;,</span></span>
<span class="line"><span>          Principal = {</span></span>
<span class="line"><span>            Service = &quot;ec2.amazonaws.com&quot;</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          Effect = &quot;Allow&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>É preciso criar uma role para as instancias EC2, para que elas possam se comunicar com o banco de dados RDS, e também é preciso criar uma role para o load balancer, para que ele possa se comunicar com as instancias EC2.</p><h3 id="cloudwatch" tabindex="-1">CloudWatch <a class="header-anchor" href="#cloudwatch" aria-label="Permalink to &quot;CloudWatch&quot;">​</a></h3><p>Logo abaixo temos o codigo do modulo CloudWatch, que é responsavel por criar as metricas e alarmes necessarios para o projeto.</p><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>resource &quot;aws_autoscaling_policy&quot; &quot;asg_policy_up&quot; {</span></span>
<span class="line"><span>  name                   = &quot;my-asg-policy&quot;</span></span>
<span class="line"><span>  policy_type            = &quot;TargetTrackingScaling&quot;</span></span>
<span class="line"><span>  autoscaling_group_name = aws_autoscaling_group.project_asg.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  target_tracking_configuration {</span></span>
<span class="line"><span>    predefined_metric_specification {</span></span>
<span class="line"><span>      predefined_metric_type = &quot;ASGAverageCPUUtilization&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    target_value = 10.0</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>resource &quot;aws_autoscaling_policy&quot; &quot;asg_policy_down&quot; {</span></span>
<span class="line"><span>  name                   = &quot;my-asg-policy&quot;</span></span>
<span class="line"><span>  policy_type            = &quot;TargetTrackingScaling&quot;</span></span>
<span class="line"><span>  autoscaling_group_name = aws_autoscaling_group.project_asg.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  target_tracking_configuration {</span></span>
<span class="line"><span>    predefined_metric_specification {</span></span>
<span class="line"><span>      predefined_metric_type = &quot;ASGAverageCPUUtilization&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    target_value = 5.0</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>É preciso criar metricas e alarmes para o load balancer, para que ele possa escalar as instancias EC2 de acordo com a demanda. No codigo acima temos a criação de metricas e alarmes para escalar as instancias EC2 para cima e para baixo, de acordo com a demanda. A ideia é que quando a CPU das instancias EC2 estiver acima de 10%, o load balancer irá escalar as instancias EC2 para cima, e quando a CPU das instancias EC2 estiver abaixo de 5%, o load balancer irá escalar as instancias EC2 para baixo.(Colocado um valor baixo para fins de teste).Utilizei a métrica de envio de email com o SNS, para que eu receba um email quando o alarme for acionado, mas não irei colocar o codigo aqui para não ficar muito extenso.</p>`,22);function u(d,m,_,g,q,b){const s=e("Badge");return p(),o("div",null,[c,i(s,{type:"warning",text:"O codigo foi separado em pastas, cada pasta é um modulo, e cada modulo tem seu codigo separado em arquivos. Na main são chamadas esses modulos, e é feita a integração entre eles."}),r])}const f=n(l,[["render",u]]);export{v as __pageData,f as default};
