<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Emergency Contacts</h1>
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
                  <h3 class="card-title">Add Inspector Emergency Contacts</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" placeholder="Enter first name"
                      v-model="form.first_name"
                    >
                    <span class="help-block" 
                      v-if="errors.first_name"
                    >{{ errors.first_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" placeholder="Enter last name"
                      v-model="form.last_name"
                    >
                    <span class="help-block" 
                      v-if="errors.last_name"
                    >{{ errors.last_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" placeholder="Enter email"
                      v-model="form.email"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="number" class="form-control" placeholder="Enter phone"
                      v-model="form.phone"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alternate Phone</label>
                    <input type="number" class="form-control" placeholder="Enter alternate phone"
                      v-model="form.alt_phone"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Relation</label>
                    <select class="form-control custom-select"
                      v-model="form.relation"
                    >
                      <option value="">Select Relation</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Wife">Wife</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Address 1</label>
                    <input type="text" class="form-control" placeholder="Enter address 1"
                      v-model="form.address_1"
                    >
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
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" placeholder="Enter country"
                      v-model="form.country"
                    >
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
                    >Create Inspector Emergency Contact</button>
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
  name: 'CreateInspectorEmergencyContacts',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      relation: '',
      marital_status: '',
      active: 1,
      role_id: ''
    },
  }),
  mounted() {
    this.form.role_id = 3;
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        await this.$axios.post(`/users/${this.$route.params.employeeId}/emergencies`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>