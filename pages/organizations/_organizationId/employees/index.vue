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
              <a class="refresh" href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Inspectors</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Actions</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Type of Accredition</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="13">Loading...</td>
                      </tr>
                      <tr v-for="(emp, i) in items"
                        :key="`emp${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <nuxt-link title="View Details" class="icon" :to="`/organizations/${organization.value}/employees/${emp.id}/full`">
                            <i class="fas fa-eye"></i>
                          </nuxt-link>&nbsp;&nbsp;
                          <nuxt-link title="Edit Details" class="icon" :to="`/organizations/${organization.value}/employees/${emp.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>&nbsp;&nbsp;
                          <a title="View in PDF" class="icon" target="_blank" :href="`${baseUrl}/users/${emp.id}/download`">
                            <i class="fas fa-file-pdf"></i>
                          </a>&nbsp;&nbsp;
                          <nuxt-link title="Delete Inspector" class="icon" to="">
                            <span @click="del(emp.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>
                          <img style="width: 50px; height: 50px;" :src="mediaUrl + (emp.attachment ? emp.attachment : '/user.png')">
                          <br>
                          {{ emp.emp_code }}
                        </td>
                        <td>{{ emp.first_name }} {{ emp.middle_name }} {{ emp.last_name }}</td>
                        <td>{{ emp.email }} <br> {{ emp.email_2 }}</td>
                        <td>{{ emp.phone_code }} {{ emp.phone }} <br> {{ emp.phone_2_code }} {{ emp.phone_2 }}</td>
                        <td>{{ emp.addresses.length ? emp.addresses[0].country : '' }}</td>
                        <td></td>
                        <td>{{ emp.remarks }}</td>
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
      // let items = await this.$axios.get(`/users?role_id=3&page=1`)
      let items = await this.$axios.get(`/users?role_id=3`)
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
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
        await this.$axios.delete(`/users/${id}`)
      this.getData()
    }
  }
}
</script>