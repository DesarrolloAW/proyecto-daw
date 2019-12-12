
import React,{forwardRef}from 'react';
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
          { title: 'Observador', field: 'observador' },
          { title: 'Fase Lunar', field: 'faselunar' },
          { title: 'Época', field: 'epoca' },
          { title: 'Estación', field: 'estacion'},
          { title: 'Cant. mediciones', field: 'cantidad' },
          { title: 'Revisión', field: 'revision'},
        ]}
        data={[
          {observador: 'Kenny Camba',faselunar:'Llena', epoca: 'none', estacion: 'playas', cantidad: '10',revision:'completa'},
      


        ]} 
        options={{
          search: true
        }}
      />
    )
    }
  }

export default DataSearch;