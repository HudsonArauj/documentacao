import{_ as a,o as r,c as e,R as o}from"./chunks/framework.Sz4zxnX4.js";const f=JSON.parse('{"title":"Descrição:","description":"","frontmatter":{},"headers":[],"relativePath":"etapas.md","filePath":"etapas.md"}'),t={name:"etapas.md"},s=o(`<h1 id="descricao" tabindex="-1">Descrição: <a class="header-anchor" href="#descricao" aria-label="Permalink to &quot;Descrição:&quot;">​</a></h1><h2 id="projeto-de-infraestrutura-como-codigo-iac-com-terraform-na-aws" tabindex="-1">Projeto de Infraestrutura como Código (IaC) com Terraform na AWS <a class="header-anchor" href="#projeto-de-infraestrutura-como-codigo-iac-com-terraform-na-aws" aria-label="Permalink to &quot;Projeto de Infraestrutura como Código (IaC) com Terraform na AWS&quot;">​</a></h2><h3 id="objetivo" tabindex="-1">Objetivo: <a class="header-anchor" href="#objetivo" aria-label="Permalink to &quot;Objetivo:&quot;">​</a></h3><p>O objetivo deste projeto é utilizar o Terraform para provisionar e gerenciar de forma automatizada a infraestrutura na AWS. A infraestrutura será estruturada em módulos para garantir a separação de responsabilidades e facilitar a manutenção.</p><h3 id="arquitetura-proposta" tabindex="-1">Arquitetura Proposta: <a class="header-anchor" href="#arquitetura-proposta" aria-label="Permalink to &quot;Arquitetura Proposta:&quot;">​</a></h3><p>A arquitetura consistirá em diversos serviços da AWS, como EC2, RDS, e outros, provisionados de maneira automatizada e organizada.</p><h2 id="estrutura-do-projeto" tabindex="-1">Estrutura do Projeto: <a class="header-anchor" href="#estrutura-do-projeto" aria-label="Permalink to &quot;Estrutura do Projeto:&quot;">​</a></h2><h4 id="modulos" tabindex="-1">Módulos: <a class="header-anchor" href="#modulos" aria-label="Permalink to &quot;Módulos:&quot;">​</a></h4><p>Cada recurso AWS será encapsulado em um módulo Terraform para promover a modularidade e a reutilização de código. Exemplos de módulos incluirão EC2, RDS, VPC, etc. Armazenamento do Estado:</p><p>O estado do Terraform será armazenado em um bucket do Amazon S3 para garantir a consistência e integridade do estado. Isso permitirá que a equipe trabalhe de forma colaborativa sem interferências.</p><h2 id="scripts-terraform" tabindex="-1">Scripts Terraform: <a class="header-anchor" href="#scripts-terraform" aria-label="Permalink to &quot;Scripts Terraform:&quot;">​</a></h2><p>Criação da Infraestrutura:</p><p>Um script Terraform será desenvolvido para criar toda a infraestrutura necessária com um único comando. Esse script irá chamar os diferentes módulos, garantindo uma execução eficiente e sem intervenção manual do usuário.</p><h2 id="execucao-do-projeto" tabindex="-1">Execução do Projeto: <a class="header-anchor" href="#execucao-do-projeto" aria-label="Permalink to &quot;Execução do Projeto:&quot;">​</a></h2><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>terraform init</span></span>
<span class="line"><span>terraform apply</span></span></code></pre></div><p><strong>terraform init</strong>: Inicializa o diretório de trabalho do Terraform e baixa os módulos necessários para a execução do projeto.</p><p><strong>terraform apply</strong>: Aplica as alterações necessárias para atingir o estado desejado da configuração.</p><h2 id="destruindo-a-infraestrutura" tabindex="-1">Destruindo a Infraestrutura: <a class="header-anchor" href="#destruindo-a-infraestrutura" aria-label="Permalink to &quot;Destruindo a Infraestrutura:&quot;">​</a></h2><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>terraform destroy</span></span></code></pre></div><p><strong>terraform destroy</strong>: Destrói a infraestrutura criada pelo Terraform.</p><h2 id="controle-de-estado" tabindex="-1">Controle de Estado: <a class="header-anchor" href="#controle-de-estado" aria-label="Permalink to &quot;Controle de Estado:&quot;">​</a></h2><p>O controle de concorrência será garantido utilizando o &quot;state locking&quot; do Terraform. O estado será armazenado em um backend S3 com trava (lock) para evitar conflitos durante operações simultâneas.</p><h2 id="seguranca" tabindex="-1">Segurança: <a class="header-anchor" href="#seguranca" aria-label="Permalink to &quot;Segurança:&quot;">​</a></h2><p>Configurações de segurança serão implementadas nos diferentes níveis da infraestrutura, garantindo a conformidade com as melhores práticas de segurança da AWS.</p><h2 id="cronograma" tabindex="-1">Cronograma: <a class="header-anchor" href="#cronograma" aria-label="Permalink to &quot;Cronograma:&quot;">​</a></h2><p>O projeto será dividido em fases, com revisões regulares para garantir a qualidade e a eficácia da infraestrutura como código. Este projeto busca automatizar completamente a gestão da infraestrutura na AWS, promovendo escalabilidade, segurança e eficiência operacional.</p><p><a href="/projeto" style="display:inline-block;padding:10px 20px;background-color:#4285f4;color:#ffffff;text-decoration:none;border-radius:5px;margin-left:70%;">Próxima Página</a></p>`,27),i=[s];function n(d,c,u,l,p,m){return r(),e("div",null,i)}const g=a(t,[["render",n]]);export{f as __pageData,g as default};
