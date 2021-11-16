## Solução
Implementei uma solução simples com create-react-app, redux e material-ui. A proposta é uma aplicação para criação de eventos na qual o usuário poderá atribuir valores para comida e bebida, bem como valor para opções veganas. Cada convidado pode ter necessidade específicas, e isso acarretará em um valor diverso para cada um

## Telas
A aplicação conta com uma tela de chegada, apenas com botão para logar.
Tela de listagem de eventos (busca desabilitada)
Tela de criação de eventos em etapas. 
 - Etapa 1: Informações básicas do evento
 - Etapa 2: Criação da lista de convidados, podendo preencher as necessidades de cada um
 - Etapa 3: Valores e confirmação do evento

Tela de visualização do evento. Inclui a possibilidade de edição do mesmo
Tela de feedback do convidado. Nessa tela, o convidado pode corrigir as informações preenchidas pelo 

## State
A minha abordagem foi ter 2 reducers para administração do state da aplicação. 
 - Session: State voltado para as informações carregadas da api, voltadas para a estrutura da aplicaçao total
 - ChurrasForm: State voltado para a administração das informações do evento, com ações específicas para ajudar a manejar o formulário

## Interface
Utilizei os componentes da Material-UI para facilitar no desenvolvimento da ui.

## Fluxo
1. Landing Page -> Usuário faz o cadastro e preenche as informações complementares
2. Listagem de churras -> Usuário pode ver todos os churrascos que criou e também pode criar mais
3. Criação de churras -> Criação em 3 etapas
 - Etapa 1: Informações básicas do evento
 - Etapa 2: Criação da lista de convidados, podendo preencher as necessidades de cada um
 - Etapa 3: Valores e confirmação do evento
4. Página de feedback dos convidados -> Nessa página o convidado corrige as informações que o criador do evento preencheu e já recebe o valor que tem que pagar. O convidado pode também copiar a chave pix do criador e confirmar a presença
5. Visualização do churras -> Na tela de visualização do churras o usuário pode ir acompanhando o valor arrecadado e também ir atualizando os convidados (como a mensageria ta off, essa é a forma de ir atualizando o evento).
6. Depois de realizado o churras, o usuario pode cancelar o evento para deletar ele da lista.

## Host 
Fiz o host no cloudfront. https://app.churras-trinca.com
Aws as vezes dá uns probleminhas.....

