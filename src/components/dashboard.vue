<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Employee data</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <div class="col-12 float-end mb-2 px-0 d-flex justify-content-between">
        <!-- <select v-model="selectedSortOption" id="sortByOptions" class="form-control rounded-0 width-250" @change="changeSortOrderHandler(selectedSortOption)">
          <option>Sort By</option>
          <option v-for="option in sortOptions" :key="option"> {{ option }} </option>
        </select> -->
        <div class="d-flex">
          <v-select v-model="selectedSortOption" :options="sortOptions" class="width-250" @input="changeSortOrderHandler(selectedSortOption)" />
          <v-select v-model="filterByCountry" :options="countryNames" class="width-250 ml-2" @input="filterByCountryHandler(filterByCountry)" />
        </div>
        <input type="text" v-model="searchedName" @input="searchNameHandler(searchedName)" class="float-end form-control rounded-0 w-25" placeholder="Search">
      </div>
      <table id="example1" class="table table-bordered mb-1">
        <thead>
        <tr>
          <th> <input v-model="selectAllEmp" type="checkbox" @change="selectAll"> </th>
          <th>Id</th>
          <th>Name</th>
          <th>Department</th>
          <th>Email</th>
          <th>Country</th>
          <th>Phone</th>
          <th>Birthday</th>
          <th>Created at</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="emp in empData" :key="emp.id">
          <td> <input type="checkbox" v-model="selected"> </td>
          <td> {{ emp.id }} </td>
          <td> {{ emp.name }} </td>
          <td> {{ emp.department }} </td>
          <td> {{ emp.email }} </td>
          <td> {{ emp.country }} </td>
          <td> {{ emp.phone }} </td>
          <td> {{ emp.birthday }} </td>
          <td> {{ emp.createdAt }} </td>
        </tr>
        </tbody>
      </table>
      <pagination
      :totalPages="100"
      :perPage="10"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
    </div>
    <!-- /.card-body -->

  </div>
  <!-- /.card -->

</template>
<script>
import axios from 'axios';
import Pagination from './pagination.vue';
import sortPlaceholder from '../assets/img/icons8-sort-30.png';
import sortDes from '../assets/img/icons8-sort-24.png';

export default {
  components:{
    Pagination
  },
  data(){
    return {
      empData: [],
      currentPage: 1,
      totalPages: '',
      sortDefaultImage: sortPlaceholder,
      SortDescendingImage: sortDes,
      sortDefault: '',
      sortDescending: '',
      sortBy: '',
      sortOptions: ['Sort By','id','name', 'Created at'],
      selectedSortOption: 'Sort By',
      base_url: "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee?",
      countryNames: [],
      searchedName: '',
      filterByCountry:'Filter by Country',
      selectEmployee: '',
      selectAllEmp: false,
      selected: []
    }
  },
  mounted(){
    this.getAllEmployeeData();
  },
  methods: {
    selectAll(){
      if(this.selectAllEmp){
        const selected = this.empData.map((u) => u.id);
        this.selected =selected;
      } else{
        this.selected = [];
      }
    },
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
    },
    // Get all unique countries for "Filter by country" dropdown
    getAllCountryNames(){
      console.log("Inside GeAtALl countries");
      this.countryNames = this.empData.map(el=>{
        return el.country;
      });
      this.countryNames = [...new Set(this.countryNames)];
    },
    //Sort columns functionality
    changeSortOrderHandler(sortValue){
      if(sortValue){
        if(sortValue == "Created at"){
          sortValue = "createdAt";
        }
        this.base_url = this.base_url + "&sortBy="+ sortValue+"&order=desc";
        console.log("Base is ", this.base_url);
      }
      this.getAllEmployeeData();
    },

    filterByCountryHandler(filterCountryName){
      if(filterCountryName){
        console.log("Inside filter country name");
        this.base_url = this.base_url + "&country="+ filterCountryName;
        console.log("Base URL:", this.base_url);
        // axios.get(this.base_url)
        // .then(res => {
        //   this.empData = res.data;
        //   // this.countryNames = res.data.country;
        //   this.countryNames = this.empData.map(el=>{
        //     return el.country;
        //   });
        // });
      }
      this.getAllEmployeeData();
    },

    searchNameHandler(searchValue){
      if(searchValue){
        this.base_url = this.base_url + "&name=" + searchValue;
      }
    },
    getAllEmployeeData(){

      axios.get(this.base_url)
      .then(res => {
        this.empData = res.data;
        if(this.countryNames.length == 0){
          console.log("Inside the if condition in mounted");
          this.getAllCountryNames();
        }
      });
      this.base_url = "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee?";
    },
    // sortHandler(){
    //   console.log("Sorting");
    //   if(this.sortDefault == ""){
    //     this.sortDefault = "desc";
    //     console.log("Sortby is ", this.sortBy);
    //     console.log("Sort default value is ", this.sortDefault);
    //     axios.get("https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee?page=1&limit=10&sortBy=country&order=asc")
    //     .then(res => {
    //     this.empData = res.data;
    //     console.log("Res is ", this.empData);
    //   });
    //   }
    // }
  }
}

</script>
<style scoped>
.width-250{
  width: 200px;
}

</style>
