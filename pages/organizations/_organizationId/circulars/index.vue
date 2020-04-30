<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Circulars</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Circulars</li>
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
                  <h3 class="card-title">Manage Circulars</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/circulars/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th @click="sort('year')">
                          Month/Year
                          <i v-if="currentSortDir == 'asc'" class="fas fa-arrow-up"></i>
                          <i v-if="currentSortDir == 'desc'" class="fas fa-arrow-down"></i>
                        </th>
                        <th @click="sort('name')">
                          Name
                          <i v-if="currentSortDir == 'asc'" class="fas fa-arrow-up"></i>
                          <i v-if="currentSortDir == 'desc'" class="fas fa-arrow-down"></i>
                        </th>
                        <th>Link</th>
                        <th>Attachment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="5">Loading...</td>
                      </tr>
                      <tr v-for="(circular, i) in sorteditems"
                        :key="`circular${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ circular.month }} / {{ circular.year }}</td>
                        <td>{{ circular.name }}</td>
                        <td><a :href="circular.link" target="_blank">{{ circular.link }}</a></td>
                        <td><a :href="mediaUrl + circular.imagepath" target="_blank">{{ circular.imagepath }}</a></td>
                        <td class="w-1">
                          <nuxt-link title="Edit Details" class="icon" :to="`/organizations/${organization.value}/circulars/${circular.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link title="Delete Details" class="icon" to="">
                            <span @click="del(circular.id)">
                              <i class="fa fa-trash"></i>
                            </span>
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
  name: 'ManageCirculars',
  data:() =>  ({
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
      let items = await this.$axios.get(`/circulars`)
      this.items = items.data.data
      this.loading = false
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the circular?')
      if(r)
        await this.$axios.delete(`/circulars/${id}`)
      this.getData()
    },
    sort(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  }
}
</script>