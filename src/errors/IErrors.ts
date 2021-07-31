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
  },
  product: {
    notFound: { error: 'Produto não encontrado.', code: 300001 },
    notFoundAll: { error: 'Nenhum produto encontrado.', code: 300002 },
  },
  favoriteProduct: {
    notFound: { error: 'Produto não encontrado na lista de favoritos.', code: 400001 },
    notFoundAll: { error: 'Nenhum produto encontrado na lista de favoritos.', code: 400002 },
    failedToStore: { error: 'Falha ao favoritar produto.', code: 400003 },
    failedToIndex: { error: 'Falha ao buscar favoritos.', code: 400004 },
    failedToDelete: { error: 'Falha ao remover produto dos favoritos.', code: 400005 },
    failedToShow: { error: 'Falha ao buscar produto na lista de favoritos.', code: 400006 },
  },
};

export default IErrors;
