import { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import React from 'react';

export default function Video() {
    const contexto = React.useContext(ColorModeContext);

    return (
        <div>
            Video!
            <button onClick={() => contexto.toggleMode()}>Troque a cor!</button>
        </div>
    )
}