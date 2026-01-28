import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

import { Produto } from './models/Produto'
import { useGetProdutosQuery } from './services/api'
import { adicionar } from './store/reducers/carrinho'
import { RootState } from './store'

function App() {
  const dispatch = useDispatch()

  const { data: produtos = [] } = useGetProdutosQuery()

  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )

  const [favoritos, setFavoritos] = useState<Produto[]>([])

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      setFavoritos(favoritos.filter((p) => p.id !== produto.id))
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionar(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header
          favoritos={favoritos}
          itensNoCarrinho={itensNoCarrinho}
        />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
