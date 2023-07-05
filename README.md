# Apresentação

Este código foi desenvolvido com inspiração nas necessidades organizacionais dos servidores do FiveM, uma plataforma que permite o acesso multiplayer aos servidores personalizados de GTA V<br/>
A sua função é automatizar, organizar e padronizar o envio de comunicado(s) que devem(ão) ser(em) repassados<br/>
A integração com o Discord, um aplicativo de comunicação gratuito, é necessária para o pleno funcionamento do código

### Funcionalidades

 * `Comunicar`
   * Assim que clicado no botão será aberto um formulário solicitando o preenchimento dos seguintes dados: Discord ID do canal onde será enviado o comunicado e o próprio comunicado
    * Caso o Discord ID inserido esteja inválido, o(a) usuário(a) receberá uma mensagem, marcando-o(a), informando que este campo preenchido está incorreto
    * Caso o Discord ID inserido esteja válido, o(a) usuário(a) receberá uma mensagem, marcando-o(a), informando o(a) usuário(a) que fez o envio do comunicado e também uma mensagem que o comunicado foi enviado com sucesso

 * `Auditoria`
    * Os seguintes registros são enviados para um canal específico (escolhido pelo(a) usuário(a)): usuário(a) que enviou o comunicado e o comunicado

# Passo a passo para a execução bem-sucedida

### Observações
 * O código fonte poderá ser hospedado em qualquer máquina, independentemente de seu sistema operacional, desde que possua o [Node.js](https://nodejs.org/en)

### Realize a instalação de todos os módulos necessários para a execução bem-sucedida
```
npm i
```

### Verifique se todos os módulos estão atualizados
```
npm outdated
```

### Se possuir algum(ns) módulo(s) para atualização, atualize-o(s)
```
npm update 
```