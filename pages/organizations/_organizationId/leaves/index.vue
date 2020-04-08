<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Leaves</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Leaves</li>
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
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Leaves</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/leaves/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Inspector</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="5">Loading...</td>
                      </tr>
                      <tr v-for="(item, i) in items"
                        :key="`item${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/leaves/${item.id}?userId=${item.user_id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="del(item.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ item.user.first_name + ' ' + item.user.last_name }}</td>
                        <td>{{ item.from_date }}</td>
                        <td>{{ item.to_date }}</td>
                        <td>{{ item.description }}</td>
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
  name: 'ManageUserLeaves',
  data:() =>  ({
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
      let items = await this.$axios.get(`/user_leaves?search=all`)
      this.items = items.data.data
      this.loading = false
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r)
        await this.$axios.delete(`/user_leaves/${id}`)
      this.getData()
    }
  }
}
</script>