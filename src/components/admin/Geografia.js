import React from "react";
import MaterialTable from 'material-table';
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
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Eye from '@material-ui/icons/RemoveRedEye'
class Geografia extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            name: this.props.name,
            child: this.props.child,
            colums: [
                { title: 'Id', field: 'id' },
                { title: 'Nombre', field: 'nombre' }
            ],
            data: [],
            load1: false,
            load2: false,
            load3: false,
            id_p: 0,
            id_c: 0,
        }
    }

    loadData(type) {
        if (!this.state.load1) {
            fetch("http://localhost:8000/" + type)
                .then(res => res.json())
                .then(res => {
                    var data = [];
                    for (var prov in res) {
                        var obj = new Object();
                        obj.id = prov;
                        obj.nombre = res[prov];
                        data.push(obj);
                    }
                    this.setState({ load1: true, data: data });
                })
                .catch(() => this.setState({ load1: false }))
        }

    }

    loadData2(type) {
        if (!this.state.load2) {
            fetch("http://localhost:8000/" + type)
                .then(res => res.json())
                .then(res => {
                    var data = [];
                    for (var prov in res) {
                        var obj = new Object();
                        obj.id = prov;
                        obj.nombre = res[prov];
                        data.push(obj);
                    }
                    this.setState({ load2: true, data: data });
                })
                .catch(() => this.setState({ load2: false }))
        }

    }

    loadData3(type) {
        if (!this.state.load3) {
            fetch("http://localhost:8000/" + type)
                .then(res => res.json())
                .then(res => {
                    var data = [];
                    for (var prov in res) {
                        var obj = new Object();
                        obj.id = prov;
                        obj.nombre = res[prov];
                        data.push(obj);
                    }
                    this.setState({ load3: true, data: data });
                })
                .catch(() => this.setState({ load3: false }))
        }

    }

    render() {
        this.loadData('provincias/');
        return (
            <MaterialTable
                title={this.state.name}
                columns={this.state.colums}
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
                    Delete: Delete,
                    Edit: Edit, 
                }}
                data={this.state.load1 ? this.state.data : []}
                actions={[
                    {
                        icon: Eye,
                        tooltip: 'Ver',
                        onClick: (event, rowData) => {
                            if(this.state.child == "provincia"){
                                this.setState({ data: [], name: "Cantones ("+rowData.nombre+")", child: "canton", id_p:  rowData.id });
                                this.loadData2("cantones/?id_provincia=" + rowData.id);
                            }else if(this.state.child == "canton"){
                                this.setState({ data: [], name: "Parroquias ("+rowData.nombre+")", child: "parroquia", id_c: rowData.id });
                                this.loadData3("parroquias/?id_canton=" + rowData.id);
                            }
                            
                        }
                    }
                ]}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    if(this.state.child == "provincia"){
                                        fetch('http://localhost:8000/crear_provincia/', {method: 'POST', body: JSON.stringify(newData)});
                                    }else if(this.state.child == "canton"){
                                        newData.id_p = this.state.id_p;
                                        fetch('http://localhost:8000/crear_canton/', {method: 'POST', body: JSON.stringify(newData)});
                                    }else{
                                        newData.id_c = this.state.id_c;
                                        fetch('http://localhost:8000/crear_parroquia/', {method: 'POST', body: JSON.stringify(newData)});
                                    }
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        newData.id = oldData.id;
                                        if(this.state.child == "provincia"){
                                            fetch('http://localhost:8000/actua_provincia/', {method: 'PUT', body: JSON.stringify(newData)});
                                        }else if(this.state.child == "canton"){
                                            fetch('http://localhost:8000/actua_canton/', {method: 'PUT', body: JSON.stringify(newData)});
                                        }else{
                                            fetch('http://localhost:8000/actua_parroquia/', {method: 'PUT', body: JSON.stringify(newData)});
                                        }
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    if(this.state.child == "provincia"){
                                        fetch('http://localhost:8000/borrar_provincia/', {method: 'DELETE', body: JSON.stringify(oldData)});
                                    }else if(this.state.child == "canton"){
                                        fetch('http://localhost:8000/borrar_canton/', {method: 'DELETE', body: JSON.stringify(oldData)});
                                    }else{
                                        fetch('http://localhost:8000/borrar_parroquia/', {method: 'DELETE', body: JSON.stringify(oldData)});
                                    }
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}>

            </MaterialTable>
        );
    }
}

export default Geografia;
