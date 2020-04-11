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
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) | Relation: {{ form.first_name }} {{ form.last_name }}</h1>
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
                  <h3 class="card-title">Edit Inspector Relation Details</h3>
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
                    <span class="help-block" 
                      v-if="errors.email"
                    >{{ errors.email[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <country-codes
                          :option.sync="form.phone_code"
                        ></country-codes>
                      </div>
                      <input type="number" class="form-control" placeholder="Enter phone" v-mask="'##########'" v-model="form.phone">
                    </div>
                    <span class="help-block" 
                      v-if="errors.phone"
                    >{{ errors.phone[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alternate Phone</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <country-codes
                          :option.sync="form.alt_phone_code"
                        ></country-codes>
                      </div>
                      <input type="number" class="form-control" placeholder="Enter alternate phone"
                        v-model="form.alt_phone" 
                        v-mask="'##########'" 
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Relation</label>
                    <v-select 
                      v-model="form.relation" 
                      :reduce="relation => relation.code" 
                      :options="relations"
                    ></v-select>
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
                    >Update Inspector Relation</button>
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
import CountryCodes from '@/components/country-codes.vue'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'EditInspectorRelation',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let relation = await $axios.get(`/users/${params.employeeId}/relations/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: relation.data.data
    }
  },
  data: () => ({
    relations: [
      {'label': "Select Relation", 'code': ""},
      {'label': "Father", 'code': "Father"},
      {'label': "Wife", 'code': "Wife"},
      {'label': "Son", 'code': "Son"},
      {'label': "Daughter", 'code': "Daughter"},
      {'label': "Friend", 'code': "Friend"},
    ],
  }),
  mounted() {
    this.form.role_id = 3;
  },
  components: {
    BackButton,
    CountryCodes
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/relations/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>