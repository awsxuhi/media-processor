import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import Refresh from '@material-ui/icons/Refresh';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import 'react-tabs/style/react-tabs.css';
import Switch from '@material-ui/core/Switch';
import tableIcons from './tableIcon.js'


const api = axios.create({
  //baseURL: `http://localhost:8080`
})


function App() {
  var columns = [
    // {title: "视频流ID", field: "id",editable: 'never',cellStyle:{backgroundColor: "green" }},
    // {title: "签名KEY",  field: "key",editable: 'never',      headerStyle: {
    //       backgroundColor: "green"       
    //   }},
    { title: "名称", field: "videoname" },
    { title: "截图", field: "isImage", type: 'boolean', initialEditValue: false, render: rowData => rowData.isImage === true ? <Switch size="small" checked={true}/> : <Switch size="small" checked={false}/> },
    { title: "视频录制", field: "isVideo", type: 'boolean', initialEditValue: false, render: rowData => rowData.isVideo === true ? <Switch size="small" checked={true}/> : <Switch size="small" checked={false}/> },
    { title: "HLS点播", field: "isOnDemand", type: 'boolean', initialEditValue: false, render: rowData => rowData.isOnDemand === true ?<Switch size="small" checked={true}/> : <Switch size="small" checked={false}/> },
    { title: "截图频率", field: "image_time", type: 'numeric', initialEditValue: '30' },
    { title: "视频录制频率", field: "video_time", type: 'numeric', initialEditValue: '60' },
  ]
  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    setIsLoading(true)
    api.get("/videostreams")
      .then(res => {
        // console.log(res);
        setData(res.data.data)
      })
      .catch(error => {
        console.log("Error")
      })
    setIsLoading(false)
  }, [])

  const refresh = (resolve) => {
    setIsLoading(true)
    api.get("/videostreams")
      .then(res => {
        setData(res.data.data)
        resolve()
      })
      .catch(error => {
        console.log("Error")
      })
    setIsLoading(false)
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    setIsLoading(true)
    let errorList = []
    // if(newData.first_name === ""){
    //   errorList.push("Please enter first name")
    // }

    if (errorList.length < 1) {
      //  
      const id = newData.id;
      const key = newData.key;

      delete newData['TimeStamp'];
      delete newData['key'];
      delete newData['id'];
      console.log(newData)
      api.put("/videostreams/" + id, newData)
        .then(res => {
          console.log('update row:' + JSON.stringify(res));
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          newData.id = id;
          newData.key = key;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
    setIsLoading(false)
  }



  const tableRef = React.createRef();

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="App"  >
      <Grid container justify="center" style={{ backgroundColor: '#grey', padding: 2 }}>

        <Grid item xs  >
          <div>
            {iserror &&
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <MaterialTable
            isLoading={isLoading}
            tableRef={tableRef}
            actions={[
              {
                icon: Refresh,
                tooltip: '刷新',
                isFreeAction: true,
                onClick: () => refresh()
              }
            ]}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
              paging: true,  // 是否显示分页插件
              exportButton: true,  //是否显示导出按钮
              actionsColumnIndex: 0,  // actions显示在最后一列
              addRowPosition: "first",  // 点击添加行时显示在首行
              rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#DDD' : '#EEE',
                fontSize: 13
              }),
              headerStyle: {
                backgroundColor: '#3F516C',
                color: '#FFFFFF',
                fontSize: 14,
                // padding: 10
              },
            }}
            align="center"
            title="配置管理"
            columns={columns}
            data={data}
            icons={tableIcons}
            style={{ padding: '0 10px' }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                })
            }}
          />
        </Grid>
      </Grid>
    </div>

  );
}

export default App;