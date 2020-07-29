import React from 'react';
import Collapsible from './Collapsible'

class Covid extends React.Component{
    render()
    {
    return( 
        <Collapsible title="Informações Gerais sobre o vírus e a doença">
            <div> 
                <p>Os coronavírus pertencem à família Coronaviridae que integra vírus que podem causar infeção no Homem, noutros mamíferos (por exemplo nos morcegos, camelos, civetas) e nas aves. Até à data, conhecemos oito coronavírus que infetam e podem causar doença no Homem. Normalmente, estas infeções afetam o sistema respiratório, podendo ser semelhantes às constipações comuns ou evoluir para uma doença mais grave, como a pneumonia. Dos coronavírus que infetam o Homem o SARS-CoV, o MERS-CoV e o SARS-CoV-2 saltaram a barreira das espécies, ou seja, estes vírus foram transmitidos ao Homem a partir de um animal reservatório ou hospedeiro desses vírus. O SARS-CoV originou uma epidemia em 2002-2003 e o MERS-CoV emergiu em 2012 e foi causando casos esporádicos de infeção humana ou pequenos clusters de casos de doença respiratória. O novo coronavírus, o SARS-CoV-2, que origina a doença designada COVID-19, foi identificado pela primeira vez em dezembro de 2019, na China.</p>
            </div>
        </Collapsible>
        )
    }
}
export default Covid;