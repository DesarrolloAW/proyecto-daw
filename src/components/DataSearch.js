
import React from 'react';
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
class DataSearch extends React.Component {





  render() {

    return (
      <MaterialTable 
         icons={{ 
            Check: Check,
            Add: Add,
            ViewColumn:ViewColumn,
            DetailPanel: ChevronRight,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Search: Search,
            ThirdStateCheck: Remove,
        }}
          title=""
        columns={[
          { title: 'Fecha', field: 'fecha'},    
          { title: 'Observador', field: 'observador' },
          { title: 'Fase Lunar', field: 'faselunar' },
          { title: 'Época', field: 'epoca' },
          { title: 'Estación', field: 'estacion'},
          { title: 'Cant. mediciones', field: 'cantidad' },
        ]}
        data={[
          {fecha: '05/12/2019',observador: 'Kenny Camba',faselunar:'Llena', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '29/11/2019',observador: 'Steven Araujo',faselunar:'Sicigia', epoca: 'Verano', estacion: '2', cantidad: '15'},
          {fecha: '15/11/2019',observador: 'Steven Araujo',faselunar:'Sicigia', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '15/11/2019',observador: 'Kenny Camba',faselunar:'Sicigia', epoca: 'Verano', estacion: '2', cantidad: '15'},
          {fecha: '15/11/2019',observador: 'Joel Espinoza',faselunar:'Cuadratura', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '15/10/2019',observador: 'Steven Araujo',faselunar:'Sicigia', epoca: 'Verano', estacion: '2', cantidad: '15'},
          {fecha: '25/10/2019',observador: 'Joel Espinoza',faselunar:'Sicigia', epoca: 'Verano', estacion: '3', cantidad: '15'},
          {fecha: '05/10/2019',observador: 'Kenny Camba',faselunar:'Sicigia', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '29/09/2019',observador: 'Joel Espinoza',faselunar:'Cuadratura', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '26/08/2019',observador: 'Joel Espinoza',faselunar:'Cuadratura', epoca: 'Verano', estacion: '3', cantidad: '15'},
          {fecha: '11/10/2019',observador: 'Kenny Camba',faselunar:'Sicigia', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '29/11/2019',observador: 'Steven Araujo',faselunar:'Sicigia', epoca: 'Verano', estacion: '2', cantidad: '15'},
          {fecha: '05/05/2019',observador: 'Steven Araujo',faselunar:'Cuadratura', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '27/11/2019',observador: 'Christian Guerrero',faselunar:'Sicigia', epoca: 'Verano', estacion: '3', cantidad: '15'},
          {fecha: '05/12/2019',observador: 'Christian Guerrero',faselunar:'Sicigia', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '07/07/2019',observador: 'Steven Araujo',faselunar:'Cuadratura', epoca: 'Verano', estacion: '2', cantidad: '15'},
          {fecha: '10/06/2019',observador: 'Steven Araujo',faselunar:'Sicigia', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '16/10/2019',observador: 'Christian Guerrero',faselunar:'Cuadratura', epoca: 'Verano', estacion: '1', cantidad: '15'},
          {fecha: '02/10/2019',observador: 'Kenny Camba',faselunar:'Cuadratura', epoca: 'Verano', estacion: '3', cantidad: '15'},
          {fecha: '10/07/2019',observador: 'Joel Espinoza',faselunar:'Sicigia', epoca: 'Verano', estacion: '3', cantidad: '15'},        
        ]} 
        options={{
          search: true
        }}
      />
    )
    }
  }

export default DataSearch;