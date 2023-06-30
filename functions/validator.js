const errosData = {
    Lanchs: {
        "lanch_price" :{
            required: "Insira um preço válido!", 
            min: { value: 1, message: "O valor precisa ser no mínimo de 1 real." }, 
        },
        "lanch_name": { 
            required: "Insira um nome válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            maxLength: { value: 20, message: "O nome precisa ter no máximo 20 letras!" } 
        },
        "lanch_description": { 
            required: "Insira uma descrição válida!", 
            minLength: { value: 3, message: "A descrição precisa ter no mínimo 3 letras!" },
            maxLength: { value: 100, message: "A descrição precisa ter no máximo 100 letras!" } 
        },
    },

    Ingredients : {
        "ingredient_name": { 
            required: "Insira um nome válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            maxLength: { value: 50, message: "O nome precisa ter no máximo 50 letras!" } 
        },
        "ingredient_stock": { 
            required: "Insira um valor válido!", 
            min: { value: 1, message: "O valor precisa ter no mínimo 1 número!" },
        },
    },

    Comb : {
        "comb_description": { 
            required: "Insira um nome válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            maxLength: { value: 50, message: "O nome precisa ter no máximo 50 letras!" } 
        },
        "comb_price" :{
            required: "Insira um preço válido!", 
            min: { value: 1, message: "O valor precisa ser no mínimo de 1 real." }, 
        },
    },

    Compra : {
        "compra_nome": { 
            required: "Insira um nome válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            maxLength: { value: 30, message: "O nome precisa ter no máximo 30 letras!" } 
        },
        "compra_numero": { 
            required: "Insire um número válido", 
            min: { value: 1, message: "O número precisa ter no mínimo 1 número!" },
        },
        "compra_cep": { 
            required: "Insire um CEP válido", 
        },
        "compra_endereco": { 
            required: "Insira um endereço válido", 
            minLength: { value: 3, message: "O endereço precisa ter no mínimo 3 letras!" },
            maxLength: { value: 40, message: "O endereço precisa ter no mínimo 40 letras!" },
        },
        "compra_complemento": { 
            required: "Insira um complemento válido", 
            minLength: { value: 3, message: "O complemento precisa ter no mínimo 3 letras!" },
            maxLength: { value: 40, message: "O complemento precisa ter no mínimo 40 letras!" },
        },
    },

    Professores: {
        "Nome": { 
            required: "Insira um nome válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            pattern: { value: /^[A-Za-z]+$/i, message: "Você precisa usar somente letras!" } 
        },
        "CPF": { 
            required: "Insira um número válido!", 
            minLength: { value: 14, message: "O CPF precisa ter no minimo 14 números!" },
            maxLength: { value: 15, message: "O CPF precisa ter no máximo 8 números!" },
        },
        "Matricula": { 
            required: "Insira uma matrícula válida!", 
            maxLength: { value: 10, message: "A matrícula precisa ter no mínimo 10 caracteres!" },
            maxLength: { value: 16, message: "A matrícula precisa ter no máximo 16 caracteres!" },
        },
        "Salario": { 
            required: "Insira um número válido!", 
            pattern: { value: /[0-9]/, message: "Insira somente números." },
        },
        "Email": { 
            required: "Insira um e-mail válido!", 
            minLength: { value: 3, message: "O nome precisa ter no mínimo 3 letras!" },
            maxLength: { value: 30, message: "O nome precisa ter no máximo 30 letras!" }
        },
        "Telefone": { 
            required: "Insira um número válido!", 
            pattern: { value: /[0-9]/, message: "Insira somente números." },
            maxLength: { value: 20, message: "Máximo de 20 números!" },
            minLength: { value: 11, message: "Mínimo de 11 números!" },
        },
        "Cep": { 
            required: "Insira um número válido!", 
            pattern: { value: /[0-9]/, message: "Insira somente números." },
            maxLength: { value: 11, message: "Máximo de 11 números!" },
            minLength: { value: 8, message: "Mínimo de 8 números!" },
        },
        "Numero": { 
            required: "Insira um número válido!", 
            pattern: { value: /[0-9]/, message: "Insira somente números." },
            maxLength: { value: 6, message: "Máximo de 6 números!" },
            minLength: { value: 1, message: "Mínimo de 1 número!" },
        },
        "Logradouro": { 
            required: "Insira um logradouro válido!", 
            minLength: { value: 1, message: "O logradouro precisa ter no mínimo 1 letras!" },
            pattern: { value: /^[A-Za-z]+$/i, message: "Você precisa usar somente letras!" } 
        },
        "Complemento": { 
            required: "Insira um complemento válido!", 
            minLength: { value: 3, message: "O complemento precisa ter no mínimo 3 letras!" },
        },
        "Bairro": { 
            required: "Insira um bairro válido!", 
            minLength: { value: 3, message: "O bairro precisa ter no mínimo 3 letras!" },
            pattern: { value: /^[A-Za-z]+$/i, message: "Você precisa usar somente letras!" } 
        },

    }
}

export default errosData