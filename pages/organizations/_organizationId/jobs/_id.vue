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
                    <label class="form-label">Vessel name</label>
                    <input type="text" class="form-control" placeholder="Enter vessel name"
                      v-model="form.vessel_name"
                    >
                    <span class="help-block" 
                      v-if="errors.vessel_name"
                    >{{ errors.vessel_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Vessel type</label>
                    <select class="form-control custom-select"
                      v-model="form.vessel_type"
                    >
                      <option value="">Select vessel type</option>
                      <option value="Oil / Chemical">Oil / Chemical</option>
                      <option value="Oil">Oil</option>
                      <option value="Chemical">Chemical</option>
                      <option value="LPG">LPG</option>
                      <option value="LNG">LNG</option>
                      <option value="Barge">Barge</option>
                      <option value="Others">Others</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.vessel_type"
                    >{{ errors.vessel_type[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Vessel Details</label>
                    <input type="text" class="form-control" placeholder="Enter vessel details"
                      v-model="form.other_detail"
                    >
                    <span class="help-block" 
                      v-if="errors.other_detail"
                    >{{ errors.other_detail[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">ETA</label>
                    <input type="text" class="form-control" placeholder="Enter eta"
                      v-model="form.eta"
                    >
                    <span class="help-block" 
                      v-if="errors.eta"
                    >{{ errors.eta[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">ETB</label>
                    <input type="text" class="form-control" placeholder="Enter etb"
                      v-model="form.etb"
                    >
                    <span class="help-block" 
                      v-if="errors.etb"
                    >{{ errors.etb[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">ETS</label>
                    <input type="text" class="form-control" placeholder="Enter ets"
                      v-model="form.ets"
                    >
                    <span class="help-block" 
                      v-if="errors.ets"
                    >{{ errors.ets[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operation</label>
                    <select class="form-control custom-select"
                      v-model="form.operation"
                    >
                      <option value="">Select operation</option>
                      <option value="">Select operation</option>
                      <option value="At anchor">At anchor</option>
                      <option value="At Sea">At Sea</option>
                      <option value="Bunkering">Bunkering</option>
                      <option value="Ballasting">Ballasting</option>
                      <option value="Cooling Down">Cooling Down</option>
                      <option value="Deballasting">Deballasting</option>
                      <option value="Discharging">Discharging</option>
                      <option value="Gassing Up">Gassing Up</option>
                      <option value="In Drydock">In Drydock</option>
                      <option value="Idle">Idle</option>
                      <option value="River Transit">River Transit</option>
                      <option value="Repairs Afloat">Repairs Afloat</option>
                      <option value="STS Loading">STS Loading</option>
                      <option value="STS Discharging">STS Discharging</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.operation"
                    >{{ errors.operation[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Cargo</label>
                    <input type="text" class="form-control" placeholder="Enter cargo"
                      v-model="form.cargo"
                    >
                    <span class="help-block" 
                      v-if="errors.cargo"
                    >{{ errors.cargo[0] }}</span>
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
                  <div class="form-group">
                    <label class="form-label">Agent Contact Person</label>
                    <input type="text" class="form-control" placeholder="Enter agent contact person"
                      v-model="form.agent_contact_person"
                    >
                    <span class="help-block" 
                      v-if="errors.agent_contact_person"
                    >{{ errors.agent_contact_person[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Agent Phone</label>
                    <input type="number" class="form-control" placeholder="Enter agent phone"
                      v-model="form.agent_phone"
                    >
                    <span class="help-block" 
                      v-if="errors.agent_phone"
                    >{{ errors.agent_phone[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Agent Phone 2</label>
                    <input type="text" class="form-control" placeholder="Enter agent phone 2"
                      v-model="form.agent_phone_2"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Agent Email</label>
                    <input type="text" class="form-control" placeholder="Enter agent email"
                      v-model="form.agent_email"
                    >
                    <span class="help-block" 
                      v-if="errors.agent_email"
                    >{{ errors.agent_email[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Agent Address</label>
                    <input type="text" class="form-control" placeholder="Enter agent address"
                      v-model="form.agent_address"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operator Name</label>
                    <input type="text" class="form-control" placeholder="Enter operator name"
                      v-model="form.operator_name"
                    >
                    <span class="help-block" 
                      v-if="errors.operator_name"
                    >{{ errors.operator_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operator Contact Person</label>
                    <input type="text" class="form-control" placeholder="Enter operator contact person"
                      v-model="form.operator_contact_person"
                    >
                    <span class="help-block" 
                      v-if="errors.operator_contact_person"
                    >{{ errors.operator_contact_person[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operator Phone</label>
                    <input type="number" class="form-control" placeholder="Enter operator phone"
                      v-model="form.operator_phone"
                    >
                    <span class="help-block" 
                      v-if="errors.operator_phone"
                    >{{ errors.operator_phone[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operator Phone 2</label>
                    <input type="text" class="form-control" placeholder="Enter operator phone 2"
                      v-model="form.operator_phone_2"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Operator Email</label>
                    <input type="text" class="form-control" placeholder="Enter operator email"
                      v-model="form.operator_email"
                    >
                    <span class="help-block" 
                      v-if="errors.operator_email"
                    >{{ errors.operator_email[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Oil Major</label>
                    <select class="form-control custom-select"
                      v-model="form.oil_major"
                    >
                      <option value="">Select oil major</option>
                      <option value="ADNOC">ADNOC</option>
                      <option value="ATC">ATC</option>
                      <option value="AMPOL">AMPOL</option>
                      <option value="BEICO">BEICO</option>
                      <option value="BP">BP</option>
                      <option value="BHP">BHP</option>
                      <option value="CONOCO PHILLIPS">CONOCO PHILLIPS</option>
                      <option value="ENI">ENI</option>
                      <option value="ENOC">ENOC</option>
                      <option value="EQUINOR">EQUINOR</option>
                      <option value="IDEMITSU">IDEMITSU</option>
                      <option value="IMT">IMT</option>
                      <option value="KOCH">KOCH</option>
                      <option value="KMG">KMG</option>
                      <option value="NAYARA">NAYARA</option>
                      <option value="NESTE">NESTE</option>
                      <option value="PHILLIPS66">PHILLIPS66</option>
                      <option value="PT">PT</option>
                      <option value="PETRONAS">PETRONAS</option>
                      <option value="RELIANCE">RELIANCE</option>
                      <option value="SHELL">SHELL</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.oil_major"
                    >{{ errors.oil_major[0] }}</span>
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
    let job = await $axios.get(`/jobs/${params.id}`)
    return {
      form: job.data.data,
    }
  },
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