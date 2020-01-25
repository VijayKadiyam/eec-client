<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspectors</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Inspectors</li>
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
              <input type="text" class="form-control" v-model="searchData" @keydown.enter="search" placeholder="Search by name / email / phone">
              <a href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Inspectors</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOB</th>
                        <th>Marital Status</th>
                        <th>Skype ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(emp, i) in items"
                        :key="`emp{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ emp.emp_code }}</td>
                        <td>{{ emp.first_name }} {{ emp.last_name }}</td>
                        <td>{{ emp.email }}</td>
                        <td>{{ emp.phone }}</td>
                        <td>{{ emp.gender }}</td>
                        <td>{{ emp.age }}</td>
                        <td>{{ emp.dob }}</td>
                        <td>{{ emp.marital_status }}</td>
                        <td>{{ emp.skype_id }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${emp.id}/full`">
                            <i class="fas fa-eye"></i>
                          </nuxt-link>&nbsp;&nbsp;
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${emp.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
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
  name: 'ManageInspectors',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true
  }),
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.items = []
      this.loading = true
      let items = await this.$axios.get(`/users?role_id=3&page=1`)
      this.items = items.data.data
      this.loading = false
    },
    async search() {
      if(this.searchData != "")
      {
        this.loading = true
        let items = await this.$axios.get(`/users?role_id=3&search=${this.searchData}`);
        console.log(items)
        this.items = items.data.data
        this.loading = false
      }
    }
  }
}
</script>