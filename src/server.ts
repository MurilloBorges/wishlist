import app from './app';
import logger from './log/logger';

app.listen(3333, () => {
  logger.info('[application] Servidor está rodando na porta: 3333', {
    field: '[application]',
  });
});
