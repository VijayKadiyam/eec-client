<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">
                <back-button
                  :link="`/organizations/${organization.value}/employees/${inspector.id}/full`"
                  title="Hi"
                >
                </back-button>
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Address</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/employees`">Inspectors</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ inspector.first_name }} {{ inspector.last_name }}</li>
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
                  <h3 class="card-title">Edit Inspector Address</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Address Type</label>
                    <select class="form-control custom-select"
                      v-model="form.address_type"
                    >
                      <option value="">Select Type</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Address 1</label>
                    <input type="text" class="form-control" placeholder="Enter address 1"
                      v-model="form.address_1"
                    >
                    <span class="help-block" 
                      v-if="errors.address_1"
                    >{{ errors.address_1[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Address 2</label>
                    <input type="text" class="form-control" placeholder="Enter address 2"
                      v-model="form.address_2"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" placeholder="Enter city"
                      v-model="form.city"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">State</label>
                    <input type="text" class="form-control" placeholder="Enter state"
                      v-model="form.state"
                    >
                    <span class="help-block" 
                      v-if="errors.state"
                    >{{ errors.state[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" placeholder="Enter country"
                      v-model="form.country"
                    >
                    <span class="help-block" 
                      v-if="errors.country"
                    >{{ errors.country[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Pincode</label>
                    <input type="number" class="form-control" placeholder="Enter pincode"
                      v-model="form.pincode"
                    >
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Update Inspector Address' }}
                    </button>
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
  name: 'EditInspectorAddress',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let address = await $axios.get(`/users/${params.employeeId}/addresses/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: address.data.data
    }
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      this.loading = true
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/addresses/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    }
  }
}
</script>