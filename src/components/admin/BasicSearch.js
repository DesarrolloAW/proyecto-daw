
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
import ClearIcon from '@material-ui/icons/Clear';

class BasicSearch extends React.Component {
  

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
            Clear: ClearIcon,
        }}
          title=""
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Usuario', field: 'user' },
          { title: 'Nombre', field: 'name' },
          { title: 'Apellido', field: 'apellido'},
          { title: 'Email', field: 'email' },
          { title: 'Rol', field: 'rol'},
        ]}
        data={[
          {id: '1',user:'saraujo', name: 'Steven', apellido: 'Araujo', email: 'saraujo@espol.edu.ec',rol:'admin'},
          {id: '2',user:'kcamba', name: 'Kenny', apellido: 'Camba', email: 'kacamba@espol.edu.ec',rol:'admin'},
          {id: '3',user:'chjoguer', name: 'Christian', apellido: 'Guerrero', email: 'chjoguer@espol.edu.ec',rol:'validador'},
          {id: '4',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',rol:'observador'},
          {id: '5',user:'saragar', name: 'Sara', apellido: 'García', email: 'saragar@espol.edu.ec',rol:'validador'},
          {id: '6',user:'joricast', name: 'Jordan', apellido: 'Castro', email: 'joricast@espol.edu.ec',rol:'visitante'},
          {id: '7',user:'anditen', name: 'Andres', apellido: 'Tenempaguay', email: 'anditen@espol.edu.ec',rol:'visitante'},
        ]} 
        options={{
          search: true
        }}
      />
    )
    }
  }

export default BasicSearch;