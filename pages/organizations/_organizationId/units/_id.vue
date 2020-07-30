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
                  :link="`/organizations/${organization.value}/units`"
                  title="Hi"
                >
                </back-button>
                Unit Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/users`">Users</nuxt-link>
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
          <div class="row">
            <div class="col-md-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Update Unit Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <h5>Customer/Farmer Details</h5>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" placeholder="Enter first name"
                          v-model="form.first_name"
                        >
                        <span class="help-block" 
                          v-if="errors.first_name"
                        >{{ errors.first_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Middle Name</label>
                        <input type="text" class="form-control" placeholder="Enter middle name"
                          v-model="form.middle_name"
                        >
                        <span class="help-block" 
                          v-if="errors.middle_name"
                        >{{ errors.middle_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" placeholder="Enter last name"
                          v-model="form.last_name"
                        >
                        <span class="help-block" 
                          v-if="errors.last_name"
                        >{{ errors.last_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Residence address</label>
                        <input type="text" class="form-control" placeholder="Enter residence address"
                          v-model="form.residence_address"
                        >
                        <span class="help-block" 
                          v-if="errors.residence_address"
                        >{{ errors.residence_address[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Contact No</label>
                        <input type="text" class="form-control" placeholder="Enter contact no"
                          v-model="form.phone_no"
                        >
                        <span class="help-block" 
                          v-if="errors.phone_no"
                        >{{ errors.phone_no[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Adhaar no</label>
                        <input type="text" class="form-control" placeholder="Enter adhaar no"
                          v-model="form.adhaar_no"
                        >
                        <span class="help-block" 
                          v-if="errors.adhaar_no"
                        >{{ errors.adhaar_no[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Email ID</label>
                        <input type="email" class="form-control" placeholder="Enter Email ID"
                          v-model="form.email"
                        >
                        <span class="help-block" 
                          v-if="errors.email"
                        >{{ errors.email[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <h5>Controller Details</h5>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Controller Serial No.</label>
                        <input type="text" class="form-control" placeholder="Enter controller serial no"
                          v-model="form.serial_no_controller"
                        >
                        <span class="help-block" 
                          v-if="errors.serial_no_controller"
                        >{{ errors.serial_no_controller[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Controller Location</label>
                        <input type="text" class="form-control" placeholder="Enter controller location"
                          v-model="form.location_controller"
                        >
                        <span class="help-block" 
                          v-if="errors.location_controller"
                        >{{ errors.location_controller[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Controller Manufacturer</label>
                        <input type="text" class="form-control" placeholder="Enter Controller Manufacturer"
                          v-model="form.manufacturer_vfd"
                        >
                        <span class="help-block" 
                          v-if="errors.manufacturer_vfd"
                        >{{ errors.manufacturer_vfd[0] }}</span>
                      </div>
                    </div>
                    <!-- <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">VFD Serial No</label>
                        <input type="text" class="form-control" placeholder="Enter VFD Serial No"
                          v-model="form.serial_no_vfd"
                        >
                        <span class="help-block" 
                          v-if="errors.serial_no_vfd"
                        >{{ errors.serial_no_vfd[0] }}</span>
                      </div>
                    </div> -->
                  </div>
                  <hr>
                  <h5>Pump & Motor Details</h5>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Motor Type</label>
                        <select class="form-control" v-model="form.motor_type">
                          <option value="">Select Motor Type</option>
                          <option value="BLDC">BLDC</option>
                          <option value="PMAC">PMAC</option>
                          <option value="AC">AC</option>
                        </select>
                        <span class="help-block" 
                          v-if="errors.motor_type"
                        >{{ errors.motor_type[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Pump Category</label>
                        <select class="form-control" v-model="form.motor_category"
                          @change="selectHps"
                        >
                          <option value="">Select Motor Category</option>
                          <option
                            v-for="(category, c) in pump_categories"
                            :key="`category${c}`" 
                            :value="category.name"
                          >{{ category.name }}</option>
                        </select>
                        <span class="help-block" 
                          v-if="errors.motor_category"
                        >{{ errors.motor_category[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Pump Set Serial No</label>
                        <input type="text" class="form-control" placeholder="Enter Pump Set Serial No"
                          v-model="form.pump_serial_no"
                        >
                        <span class="help-block" 
                          v-if="errors.pump_serial_no"
                        >{{ errors.pump_serial_no[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Motor HP</label>
                        <select class="form-control" v-model="form.motor_hp"
                          @change="selectSizes"
                        >
                          <option value="">Select Motor HP</option>
                          <option
                            v-for="(hp, c) in hps"
                            :key="`hp${c}`" 
                            :value="hp.name"
                          >{{ hp.name }}</option>
                        </select>
                        <span class="help-block" 
                          v-if="errors.motor_hp"
                        >{{ errors.motor_hp[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Motor Head Size</label>
                        <select class="form-control" v-model="form.motor_head_size">
                          <option value="">Select Motor Head Size</option>
                          <option
                            v-for="(size, c) in sizes"
                            :key="`size${c}`" 
                            :value="size.name"
                          >{{ size.name }}</option>
                        </select>
                        <span class="help-block" 
                          v-if="errors.motor_head_size"
                        >{{ errors.motor_head_size[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <h5>RMS Details</h5>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">IMEI No</label>
                        <input type="text" class="form-control" placeholder="Enter IMEI No"
                          v-model="form.imei_number"
                        >
                        <span class="help-block" 
                          v-if="errors.imei_number"
                        >{{ errors.imei_number[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">RMS Phone no</label>
                        <input type="text" class="form-control" placeholder="Enter RMS Phone no"
                          v-model="form.rms_phone_no"
                        >
                        <span class="help-block" 
                          v-if="errors.rms_phone_no"
                        >{{ errors.rms_phone_no[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Device ID</label>
                        <input type="text" class="form-control" placeholder="Enter Device ID"
                          v-model="form.device_id"
                        >
                        <span class="help-block" 
                          v-if="errors.device_id"
                        >{{ errors.device_id[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- End row -->
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...': 'Update Unit' }}
                    </button>
                  </div>
                </div>
                <!-- end form start -->
              </div>
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
import BackButton from '@/components/back-button.vue'
import 'vue-select/dist/vue-select.css';
import moment from 'moment'
import {pump_categories} from '@/scripts/utilities.js'

export default {
  name: 'UpdateUnit',
  async asyncData({$axios, params}) {
    let user = await $axios.get(`/units/${params.id}`)
    return {
      form: user.data.data
    }
  },
  data: () => ({
    form: {
    },
    loading: false,
    pump_categories: [],
    hps: [],
    sizes: [],
  }),
  mounted() {
    this.selectHps()
    this.pump_categories = pump_categories()
  },
  components: {
    BackButton,
  },
  methods: {
    selectHps() {
      let category= this.pump_categories.find(category => category.name == this.form.motor_category)
      if(category)
        this.hps = category.hps
      if(this.form.motor_hp)
        this.selectSizes()
    },
    selectSizes() {
      let hp = this.hps.find(hp => hp.name == this.form.motor_hp)
      if(hp)
        this.sizes = hp.sizes
    },
    async store() {
      this.loading = true
      try {
        let admin = await this.$axios.patch(`/units/${this.form.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/units`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
  }
}
</script>