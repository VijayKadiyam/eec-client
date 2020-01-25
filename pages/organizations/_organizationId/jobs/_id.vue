<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Job Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/jobs`">Jobs</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Create</li>
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
                  <h3 class="card-title">Edit Job Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Select Ship/Vessel</label>
                    <select class="form-control custom-select"
                      v-model="form.equipment_id"
                    >
                      <option value="">Select ship / vessel</option>
                      <option v-for="equipment in equipments" :key="`'equipment'${equipment.id}`" :value="equipment.id">{{ equipment.name }}</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.equipment_id"
                    >{{ errors.equipment_id[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder="dd/mm/yyyy" v-model="form.date">
                    </div>
                    <span class="help-block" 
                      v-if="errors.date"
                    >{{ errors.date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Time</label>
                    <input type="text" class="form-control" placeholder="Enter time"
                      v-model="form.time"
                    >
                    <span class="help-block" 
                      v-if="errors.time"
                    >{{ errors.time[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-control" placeholder="Enter location"
                      v-model="form.location"
                    >
                    <span class="help-block" 
                      v-if="errors.location"
                    >{{ errors.location[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Port Name</label>
                    <input type="text" class="form-control" placeholder="Enter port name"
                      v-model="form.port_name"
                    >
                    <span class="help-block" 
                      v-if="errors.port_name"
                    >{{ errors.port_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Agent Name</label>
                    <input type="text" class="form-control" placeholder="Enter agent name"
                      v-model="form.agent_name"
                    >
                    <span class="help-block" 
                      v-if="errors.agent_name"
                    >{{ errors.agent_name[0] }}</span>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Job</button>
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
import BackButton from '@/components/back-button.vue'

export default {
  name: 'EditJob',
  async asyncData({$axios, params}) {
    let equipments = await $axios.get(`/equipments`)
    let job = await $axios.get(`/jobs/${params.id}`)
    return {
      equipments: equipments.data.data,
      form: job.data.data,
      equipments: equipments.data.data
    }
  },
  data: () => ({
    form: {
      'equipment_id': ''
    },
  }),
  methods: {
    async store() {
      try {
        let admin = await this.$axios.patch(`/jobs/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/jobs`)
      }
      catch(e) {

      }
    }
  }
}
</script>