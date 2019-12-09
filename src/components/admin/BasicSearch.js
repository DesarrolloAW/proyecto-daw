
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
        }}
          title=""
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Usuario', field: 'user' },
          { title: 'Nombre', field: 'name' },
          { title: 'Apellido', field: 'apellido'},
          { title: 'Email', field: 'email' },
          { title: 'Tipo', field: 'tipo'},
        ]}
        data={[
          {id: '1',user:'saraujo', name: 'Steven', apellido: 'Araujo', email: 'saraujo@espol.edu.ec',tipo:'admin'},
          {id: '2',user:'kcamba', name: 'Kenny', apellido: 'Camba', email: 'kcamba@espol.edu.ec',tipo:'admin'},
          {id: '3',user:'chjoguer', name: 'Christian', apellido: 'Guerrero', email: 'chjoguer@espol.edu.ec',tipo:'user'},
          {id: '4',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '5',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '6',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '7',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '8',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '9',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '10',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '11',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '12',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '13',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '14',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},
          {id: '15',user:'joeles', name: 'Joel', apellido: 'Espinoza', email: 'joeles@espol.edu.ec',tipo:'user'},


        ]} 
        options={{
          search: true
        }}
      />
    )
    }
  }

export default BasicSearch;