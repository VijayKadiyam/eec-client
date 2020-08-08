<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Units</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Units</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <input type="text" class="form-control" v-model="searchData" @keydown.enter="search" placeholder="Search by IMEI No">
              <a class="refresh" href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Units</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/units/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Actions</th>
                        <th>Send Monthly Email</th>
                        <th>Customer/Farmer Details</th>
                        <th>IMEI No</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="13">Loading...</td>
                      </tr>
                      <tr v-for="(unit, i) in items"
                        :key="`unit${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <nuxt-link title="Edit Details" class="icon" :to="`/organizations/${organization.value}/units/${unit.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>&nbsp;&nbsp;
                          <nuxt-link title="Delete Inspector" class="icon" to="">
                            <span @click="del(unit.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>&nbsp;&nbsp;
                          <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/units/${unit.id}/data`">View Data</nuxt-link>
                        </td>
                        <td>
                          <input type="checkbox" value="1" v-model="unit.send_email" @change="updateEmailList(unit.id)">
                        </td>
                        <td>
                          <b>Name: </b>{{ unit.first_name + ' ' + (unit.middle_name ? unit.middle_name : '') + ' ' + (unit.last_name ? unit.last_name : '') }}
                          <br>
                          <b>Address: </b>{{ unit.residence_address }}
                          <br>
                          <b>Adhaar No: </b>{{ unit.adhaar_no }}
                          <br>
                          {{ unit.phone_no }}  {{ unit.email }}
                        </td>
                        <td>{{ unit.imei_number }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
          </div>
          <!-- /.row -->
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
  </section>
</template>

<script type="text/javascript">
export default {
  name: 'ManageUnits',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true,
    currentSort:'name',
    currentSortDir:'asc'
  }),
  mounted() {
    this.getData()
  },
  computed:{
    sorteditems:function() {
      return this.items.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    async getData() {
      this.items = []
      this.loading = true
      let items = await this.$axios.get(`/units`)
      this.items = items.data.data
      this.loading = false
    },
    async search() {
      if(this.searchData != "")
      {
        this.loading = true
        let items = await this.$axios.get(`/units?search=${this.searchData}`);
        this.items = items.data.data
        this.loading = false
      }
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
        await this.$axios.delete(`/units/${id}`)
      this.getData()
    },
    sort(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    async updateEmailList(id) {
      let item = this.items.find(item => item.id == id)
      // item.send_email = !item.send_email
      await this.$axios.patch(`units/${id}`, item)
      alert('Updated')
    }
  },
}
</script>