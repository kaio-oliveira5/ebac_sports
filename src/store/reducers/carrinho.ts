import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../models/Produto'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const existe = state.itens.find((p) => p.id === produto.id)

      if (!existe) {
        state.itens.push(produto)
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p) => p.id !== action.payload)
    }
  }
})

export const { adicionar, remover } = carrinhoSlice.actions
export default carrinhoSlice.reducer
