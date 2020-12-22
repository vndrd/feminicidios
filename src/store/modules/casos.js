import jsn from '../../assets/bd_fem.json'
const valoresDiferentes = function(casos, propiedad){
    const unique = [];
    jsn.map( x => 
        unique.filter( a => a == x[propiedad]).length > 0 ? null : unique.push(x[propiedad])
    );
    return unique
}
const state = {
    op_variable: 'pre',
    casos: jsn,
    original: jsn,
}
const getters = {
    get_casos:    state => state.casos,
    get_original:    state => state.original,
    lbl_relacion_victima:    state => valoresDiferentes(state.original,'relacion_victima'),
}
const mutations = {
    updateValueDts: (state,{val,campo}) => {
        state.deltas.op_cont++
        return state.deltas[campo] = val
    },
    updateRcpDts: (state,valor) => state.deltas.op_rcp = valor,
    updateVariableDelta: (state,valor) => state.op_variable = valor
}

export default {
    state,
    getters,
       // actions,
    mutations
}