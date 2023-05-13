const express = require('express');
const Twit = require('twit');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Twit
const twitterConfig = {
    consumer_key: 'LEYajlRLbsmQir46yPujRgwvy',
    consumer_secret: 'EBZj3KFtnbqqmm8ADiRDi88ojFIjWjbRMM0hP2Rp1lXuAqpYeu',
    access_token: '1027798872939216896-ctW88BEUOg4sMVQuJ2vYr41EeqTJBd',
    access_token_secret: 'v5OZx3NoyMtXo3BCMYhH1zzh3o4DN8v8vruWJh96IVHso'
};
const twitterClient = new Twit(twitterConfig);

// Configuração do OpenAI
const openAIConfig = {
  apiKey: 'AhGuRTupE5fdig3UUB6lT3BlbkFJKqWy1b4dVBBXjlcVpxiE'
};
const openAIClient = new OpenAI(openAIConfig);

// Rota para receber menções no Twitter
app.post('/webhooks/twitter', (req, res) => {
  const tweet = req.body.tweet_create_events[0];
  const { id_str: tweetId, user: { screen_name: username }, text } = tweet;

  // Verifica se a menção é direcionada a você
  if (text.includes('@coronanewsbr')) {
    // Remove a menção do texto do tweet
    const tweetText = text.replace('@coronanewsbr', '');

    // Gera uma resposta usando a API do ChatGPT
    openAIClient.complete({
      engine: 'davinci',
      prompt: tweetText,
      maxTokens: 50
    })
    .then(response => {
      const answer = response.data.choices[0].text.trim();

      // Responde ao tweet mencionando o usuário
      const replyText = `@${username} ${answer}`;
      twitterClient.post('statuses/update', { status: replyText, in_reply_to_status_id: tweetId });

      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Erro ao gerar resposta:', error);
      res.sendStatus(500);
    });
  } else {
    // Se a menção não for para você, ignora
    res.sendStatus(200);
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
