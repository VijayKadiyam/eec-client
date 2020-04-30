<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Policies</h1>
              <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/policies/create`">Add New</nuxt-link>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Policies</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

       <!-- Main content -->
      <div class="our-services">
        <div class="container">
          <div class="row">
            <div
              v-if="loading"
            > 
              <td colspan="5">Loading...</td>
            </div>

            <div class="col-md-6"
              v-for="(item, i) in items"
              :key="`item${i}`"
              v-else
            >
              <a :href="mediaUrl + item.imagepath" target="_blank">
                <div class="service-box">
                  <div class="row">
                    <div class="col-3 icon">
                      <i class="fas fa-cog" aria-hidden="true"></i>
                    </div>
                    <div class="col-9">
                      <h3><a :href="mediaUrl + item.imagepath" target="_blank">{{ item.name }}</a></h3>
                      <p>Click here to view the policy</p>
                      <nuxt-link title="Edit Details" :to="`/organizations/${organization.value}/policies/${item.id}`">
                        <span>
                          <i class="fa fa-edit"></i>
                        </span>
                      </nuxt-link>
                      <nuxt-link title="Delete Details" to="">
                        <span @click="del(item.id)">
                          <i class="fa fa-trash"></i>
                        </span>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>


          <!-- Small boxes (Stat box) -->
          <!-- <div class="row">
            <div
              v-if="loading"
            > 
              <td colspan="5">Loading...</td>
            </div>
            <div class="col-lg-3 col-6"
              v-for="(item, i) in items"
              :key="`item${i}`"
              v-else
            >
              <div class="small-box bg-white"
              >
                <div class="inner">
                  <p>{{ item.name }}</p>
                  <a :href="item.link" target="_blank">{{ item.link }}</a>
                  <br>
                  <a :href="mediaUrl + item.imagepath" target="_blank">{{ item.imagepath }}</a>
                  <br>
                  <nuxt-link style="color: white;" class="icon" :to="`/organizations/${organization.value}/policies/${item.id}`">
                    <span>
                      <i class="fa fa-edit"></i>
                    </span>
                  </nuxt-link>
                  <nuxt-link style="color: white;" class="icon" to="">
                    <span @click="del(item.id)">
                      <i class="fa fa-trash"></i>
                    </span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div> -->

      <!-- <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Policies</h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/policies/create`">Add New</nuxt-link>
                </div>
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
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
                      <tr v-for="(item, i) in items"
                        :key="`item${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td><a :href="item.link" target="_blank">{{ item.link }}</a></td>
                        <td><a :href="mediaUrl + item.imagepath" target="_blank">{{ item.imagepath }}</a></td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/policies/${item.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="del(item.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
  </section>
</template>

<script type="text/javascript">
export default {
  name: 'ManagePolicies',
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
      let items = await this.$axios.get(`/policies`)
      this.items = items.data.data
      this.loading = false
    },
    async del(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r)
        await this.$axios.delete(`/policies/${id}`)
      this.getData()
    }
  }
}
</script>

<style type="text/css">
.our-services {
    background-color: #00BCD4;
    padding: 70px 0px;
}
.service-box {
    background-color: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    margin: 15px 0px 15px;
    transition: 0.5s;
    border: 1px solid transparent;
}
.service-box:hover {
    background-color: #f9f9f9;
    border-radius: 40px;
    border: 1px solid #ddd;
}
.service-box:hover h3 a{
  color: #00bcd4;
}
.service-box .icon {
    font-size: 60px;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    color: #989898;
}
.service-box h3 a {
    text-decoration: none;
    color: #FF9800;
    font-size: 24px;
}
.service-box :before {
    margin: 0 auto;
    display: block;
    float: none;
}
</style>