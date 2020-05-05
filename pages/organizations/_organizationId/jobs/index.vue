<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Jobs</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Jobs</li>
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
              <input type="text" class="form-control" v-model="searchData" @keydown.enter="search" placeholder="Search here...">
              <a class="refresh" href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Jobs</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/jobs/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Actions</th>
                        <th>Main Inspector Details</th>
                        <th>Backup Inspector Details</th>
                        <th>Oil Major</th>
                        <th>Vessel Name</th>
                        <th>Vessel Type</th>
                        <th>Vessel Details</th>
                        <th>ETA</th>
                        <th>ETB</th>
                        <th>ETS</th>
                        <th>Operation</th>
                        <th>Cargo</th>
                        <th>Location</th>
                        <th>Port name</th>
                        <th>Coordinates</th>
                        <!-- <th>Agent Name</th>
                        <th>Agent Contact Details</th>
                        <th>Agent Phone</th>
                        <th>Agent Email</th>
                        <th>Agent Address</th>
                        <th>Operator Name</th>
                        <th>Operator Contact Details</th>
                        <th>Operator Phone</th>
                        <th>Operator Email</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="4">Loading...</td>
                      </tr>
                      <tr v-for="(job, i) in items"
                        :key="`job${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <nuxt-link title="Edit Details" class="icon" :to="`/organizations/${organization.value}/jobs/${job.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>&nbsp;&nbsp;
                          <nuxt-link title="Delete Details" class="icon" to="">
                            <span @click="del(job.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>
                          <span
                            v-for="(main, u) in job.users"
                            :key="`main${u}`"
                            v-if="main.pivot.assign_type == 'Main'"
                          >
                            {{ u + 1 }}. {{ main.first_name }} {{ main.middle_name }} {{ main.last_name }}
                            <span v-if="main.pivot.status == 0"><b>(On Hold)</b></span>
                            <span v-if="main.pivot.status == 1"><b>(Accepted)</b></span>
                            <span v-if="main.pivot.status == 2"><b>(Not Accepted)</b></span>
                            <br>
                          </span>
                        </td>
                        <td>
                          <span
                            v-for="(back, u) in job.users"
                            :key="`back${u}`"
                            v-if="back.pivot.assign_type == 'Back up'"
                          >
                            {{ u + 1 }}. {{ back.first_name }} {{ back.middle_name }} {{ back.last_name }}
                            <span v-if="back.pivot.status == 0"><b>(On Hold)</b></span>
                            <span v-if="back.pivot.status == 1"><b>(Accepted)</b></span>
                            <span v-if="back.pivot.status == 2"><b>(Not Accepted)</b></span>
                            <br>
                          </span>
                        </td>
                        <td>{{ job.oil_major }}</td>
                        <td>{{ job.vessel_name }}</td>
                        <td>{{ job.vessel_type }}</td>
                        <td>{{ job.other_detail }}</td>
                        <td>{{ job.eta }}</td>
                        <td>{{ job.etb }}</td>
                        <td>{{ job.ets }}</td>
                        <td>{{ job.operation }}</td>
                        <td>{{ job.cargo }}</td>
                        <td>{{ job.location }}</td>
                        <td>{{ job.port_name }}</td>
                        <td>{{ job.lat + ', ' + job.lng }}</td>
                        <!-- <td>{{ job.agent_name }}</td>
                        <td>{{ job.agent_contact_person }}</td>
                        <td>{{ job.agent_phone }}, {{ job.agent_phone_2 }}</td>
                        <td>{{ job.agent_email }}</td>
                        <td>{{ job.agent_address }}</td>
                        <td>{{ job.operator_name }}</td>
                        <td>{{ job.operator_contact_person }}</td>
                        <td>{{ job.operator_phone }}, {{ job.operator_phone_2 }}</td>
                        <td>{{ job.operator_email }}</td> -->
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
  name: 'ManageJobs',
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
      let items = await this.$axios.get(`/jobs?page=1`)
      this.items = items.data.data
      this.loading = false
    },
    async search() {
      if(this.searchData != "")
      {
        this.loading = true
        let items = await this.$axios.get(`/jobs?search=${this.searchData}`);
        console.log(items)
        this.items = items.data.data
        this.loading = false
      }
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
        await this.$axios.delete(`/jobs/${id}`)
      this.getData()
    }
  }
}
</script>