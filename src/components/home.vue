<template>

<div class="card">
  <div class="card-header">
    <h3 class="card-title">Employee data</h3>
  </div>
  <div class="card-body">
    <div class="col-3 offset-9 mb-2">
      <input type="text" class="form-control w-200" v-model="filter" placeholder="Filter">
    </div>

    <div id="table" name="datatable" class="col-xs-12 table-responsive">
        <bootstrap-3-datatable :columns="columns" :data="rows" :per-page="per_page" v-model="page" :filter="filter">
            <template scope="{ row }">
                <tr>
                    <td>
                      <!-- <button class="" > -->
                            <span  @click="expand(row.id)" class="view-employee"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                        <!-- </button> -->
                        {{ row.id }}</td>
                    <td>{{ row.department }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.country }}</td>
                    <td>{{ row.phone }}</td>
                    <td>{{ row.birthday }}</td>
                    <td>{{ row.createdAt }}</td>
                </tr>
                <tr v-if="expanded == row.id">
                    <td colspan="7">
                        <p v-for="checkin in  empCheckins " :key="checkin.id">
                            <strong>Checkin info:</strong>{{ checkin.checkin }}<br>
                            <strong>Location:</strong>{{ checkin.location }}<br>
                            <strong>Purpose:</strong>{{ checkin.purpose }}
                        </p>
                    </td>
                </tr>
            </template>
        </bootstrap-3-datatable>
    </div>
    <div class="col-xs-12 form-inline">
        <bootstrap-3-datatable-pager name="datatable" v-model="page" type="abbreviated" :per-page="per_page"></bootstrap-3-datatable-pager>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return {
      page: 1,
      expanded: null,
      rows: [],
      filter: '',
      countryNames: [],
      empCheckins: [],
      base_url: "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee?",
      per_page: 10,
      columns: [
            {label: 'id', field: 'id', isSortable:true, filterable:true},
            {label: 'Department', field: 'department', headerClass: 'class-in-header second-class text-left', filterable: false },
            {label: 'Email', field: 'email', hederClass: 'text-left', filterable: true, headerAlign: 'left'},
            {label: 'Country', field: 'country', headerAlign: 'left'},
            {label: 'Phone', field: 'phone', headerAlign: 'left'},
            {label: 'Birthday', field:'birthday', interpolate: true, headerAlign: 'left'},
            {label: 'Created at', field:'createdAt', interpolate: true, headerAlign: 'left'},
            // {label: 'Department', field: 'department1', headerClass: 'class-in-header second-class', filterable: false },
        ],
    }
  },
  mounted(){
    this.getAllEmployeeData();
  },
  methods:{
    expand: function(id){
      if (this.expanded == id){
        this.expanded = null;
        return;
      }
      axios.get("https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee/"+ id+ "/checkin")
      .then(res=>{
        this.empCheckins = res.data;
      });
      this.expanded = id;
    },
    //Get the list of employee data
    getAllEmployeeData(){

      axios.get(this.base_url)
      .then(res => {
        this.rows = res.data;
      });
      // this.base_url = "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee?";
    },
  },
}

</script>
<style>
  .width-250{
    width: 200px;
  }
  .view-employee:hover{
    cursor: pointer;
  }
  ul.pagination li{
    padding: 0 19px !important;
    background: #cccccc !important;
    border-radius: 2px !important;
    margin-right: 5px !important;
  }
</style>
