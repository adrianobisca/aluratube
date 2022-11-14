import { StyledRegisterVideo } from "./styles";
import React from 'react';
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm: () => {
            setValues({});
        }
    }
}

const supabaseUrl = 'https://pwbhuirjnnfvabzdnkyy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Ymh1aXJqbm5mdmFiemRua3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODgxNjksImV4cCI6MTk4Mzk2NDE2OX0.oGFyf83yZQhtTRtf2vl65CBi3lx7X9jQ1ex9NLURcAw';
const supabase = createClient(supabaseUrl, supabaseKey);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo: "Frostpunks", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel && (
                <form onSubmit={(evento) => {
                    evento.preventDefault();

                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                    })
                        .then((resp) => {
                            console.log(resp)
                        })
                        .catch((err) => {
                            console.err(err)
                        })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do video"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} />
                        <input
                            placeholder="Url"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange} />
                        <button className="cadastrar">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}

        </StyledRegisterVideo>
    )
}