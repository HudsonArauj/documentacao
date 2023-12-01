# Descrição:
## Projeto de Infraestrutura como Código (IaC) com Terraform na AWS
### Objetivo:
O objetivo deste projeto é utilizar o Terraform para provisionar e gerenciar de forma automatizada a infraestrutura na AWS. A infraestrutura será estruturada em módulos para garantir a separação de responsabilidades e facilitar a manutenção.

### Arquitetura Proposta:
A arquitetura consistirá em diversos serviços da AWS, como EC2, RDS, e outros, provisionados de maneira automatizada e organizada.



## Estrutura do Projeto:

#### Módulos:

Cada recurso AWS será encapsulado em um módulo Terraform para promover a modularidade e a reutilização de código. Exemplos de módulos incluirão EC2, RDS, VPC, etc.
Armazenamento do Estado:

O estado do Terraform será armazenado em um bucket do Amazon S3 para garantir a consistência e integridade do estado. Isso permitirá que a equipe trabalhe de forma colaborativa sem interferências.


## Scripts Terraform:

Criação da Infraestrutura:

Um script Terraform será desenvolvido para criar toda a infraestrutura necessária com um único comando. Esse script irá chamar os diferentes módulos, garantindo uma execução eficiente e sem intervenção manual do usuário.


## Execução do Projeto:
```terraform
terraform init
terraform apply

```
**terraform init**: Inicializa o diretório de trabalho do Terraform e baixa os módulos necessários para a execução do projeto.

**terraform apply**: Aplica as alterações necessárias para atingir o estado desejado da configuração.

## Destruindo a Infraestrutura:
```terraform
terraform destroy
```
**terraform destroy**: Destrói a infraestrutura criada pelo Terraform.

## Controle de Estado:

O controle de concorrência será garantido utilizando o "state locking" do Terraform. O estado será armazenado em um backend S3 com trava (lock) para evitar conflitos durante operações simultâneas.

## Segurança:

Configurações de segurança serão implementadas nos diferentes níveis da infraestrutura, garantindo a conformidade com as melhores práticas de segurança da AWS.


## Cronograma:

O projeto será dividido em fases, com revisões regulares para garantir a qualidade e a eficácia da infraestrutura como código.
Este projeto busca automatizar completamente a gestão da infraestrutura na AWS, promovendo escalabilidade, segurança e eficiência operacional.



<!-- 
<a href="/projeto" style="display: inline-block; padding: 10px 20px; background-color: #5468ff;; color: #ffffff; text-decoration: none; border-radius: 5px; margin-left : 70%">Próxima Página</a>  -->



