<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Procedures Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/procedures`">Procedures</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Update</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <!-- left column -->
            <div class="col-md-6">
              <!-- jquery validation -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit Procedures Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Enter Procedure name"
                      v-model="form.name"
                    >
                    <span class="help-block" 
                      v-if="errors.name"
                    >{{ errors.name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link</label>
                    <input type="text" class="form-control" placeholder="Enter link"
                      v-model="form.link"
                    >
                    <span class="help-block" 
                      v-if="errors.link"
                    >{{ errors.link[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <input type="text" class="form-control" placeholder="Enter attachment"
                      v-model="form.imagepath"
                    >
                    <span class="help-block" 
                      v-if="errors.imagepath"
                    >{{ errors.imagepath[0] }}</span>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Procedure</button>
                  </div>
                </div>
              </div>
              <!-- /.card -->
              </div>
            <!--/.col (left) -->
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
  name: 'EditProcedure',
  async asyncData({$axios, params}) {
    let circular = await $axios.get(`/procedures/${params.id}`)
    return {
      form: circular.data.data,
    }
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.patch(`/procedures/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/procedures`)
      }
      catch(e) {

      }
    }
  }
}
</script>