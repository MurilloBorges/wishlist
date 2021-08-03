/**
 * Método responsável por mapear todas as possíveis exceções da aplicação
 *
 * @constant
 * @returns {Object} Json
 */
const IErrors = {
  client: {
    exists: { error: 'Já existe uma conta vinculada a este e-mail.', code: 100001 },
    notFound: { error: 'Cliente não encontrado.', code: 100002 },
    failedToStore: { error: 'Falha ao criar cliente.', code: 100003 },
    failedToIndex: { error: 'Falha ao buscar clientes.', code: 100004 },
    failedToDelete: { error: 'Falha ao excluir cliente.', code: 100005 },
    failedToShow: { error: 'Falha ao buscar cliente.', code: 100006 },
    failedToUpdate: { error: 'Falha ao alterar cliente.', code: 100006 },
  },
  auth: {
    jwt: { error: 'JWT is missing.', code: 200001 },
    restrictedAccess: { error: 'Acesso Restrito.', code: 200002 },
    tokenInvalid: { error: 'Token Inválido.', code: 200003 },
    failed: { error: 'Falha ao realizar autenticação.', code: 2000004 },
    failedGenerateToken: { error: 'Falha ao gerar o token.', code: 2000005 },
    failedRefreshToken: { error: 'Falha ao atualizar o token.', code: 2000006 },
    expiredToken: { error: 'Token expirado', code: 200007 },
    FailedDecodedToken: { error: 'Falha ao realizar decodificação do token', code: 200008 },
  },
  product: {
    notFound: { error: 'Produto não encontrado.', code: 300001 },
    notFoundAll: { error: 'Nenhum produto encontrado.', code: 300002 },
    failedToIndex: { error: 'Falha ao buscar produtos', code: 300003 },
    faliedToShow: { error: 'Falha ao buscar produto.', code: 300004 },
  },
  favoriteProduct: {
    exists: { error: 'Produto já adicionado a lista de favoritos.', code: 400001 },
    notFound: { error: 'Produto não encontrado na lista de favoritos.', code: 400002 },
    notFoundAll: { error: 'Nenhum produto encontrado na lista de favoritos.', code: 400003 },
    failedToStore: { error: 'Falha ao favoritar produto.', code: 400004 },
    failedToIndex: { error: 'Falha ao buscar favoritos.', code: 400005 },
    failedToDelete: { error: 'Falha ao remover produto dos favoritos.', code: 400006 },
    failedToShow: { error: 'Falha ao buscar produto na lista de favoritos.', code: 400007 },
  },
};

export default IErrors;
