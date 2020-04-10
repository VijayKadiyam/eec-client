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
                  :link="`/organizations/${organization.value}/jobs`"
                  title="Return"
                >
                </back-button>
                Job Details
              </h1>
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
            <div class="col-md-12">
              <!-- jquery validation -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add Job Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Vessel name</label>
                        <input type="text" class="form-control" placeholder="Enter vessel name"
                          v-model="form.vessel_name"
                        >
                        <span class="help-block" 
                          v-if="errors.vessel_name"
                        >{{ errors.vessel_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
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
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Vessel Details</label>
                        <input type="text" class="form-control" placeholder="Enter vessel details"
                          v-model="form.other_detail"
                        >
                        <span class="help-block" 
                          v-if="errors.other_detail"
                        >{{ errors.other_detail[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">ETA</label>

                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                          </div>
                          <input type="text" class="form-control" v-mask="'##/##/#### ##:##:##'" placeholder="dd/mm/yyyy hh:mm:ss"
                            v-model="form.eta"
                          >
                        </div>
                        <span class="help-block" 
                          v-if="errors.eta"
                        >{{ errors.eta[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">ETB</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                          </div>
                          <input type="text" class="form-control" v-mask="'##/##/#### ##:##:##'" placeholder="dd/mm/yyyy hh:mm:ss"
                            v-model="form.etb"
                          >
                        </div>
                        <span class="help-block" 
                          v-if="errors.etb"
                        >{{ errors.etb[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">ETS</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                          </div>
                          <input type="text" class="form-control" v-mask="'##/##/#### ##:##:##'" placeholder="dd/mm/yyyy hh:mm:ss"
                            v-model="form.ets"
                          >
                        </div>
                        <span class="help-block" 
                          v-if="errors.ets"
                        >{{ errors.ets[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operation</label>
                        <v-select 
                          v-model="form.operation" 
                          :reduce="operation => operation.code" 
                          :options="operations"
                        ></v-select>
                        <span class="help-block" 
                          v-if="errors.operation"
                        >{{ errors.operation[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Cargo</label>
                        <input type="text" class="form-control" placeholder="Enter cargo"
                          v-model="form.cargo"
                        >
                        <span class="help-block" 
                          v-if="errors.cargo"
                        >{{ errors.cargo[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-control" placeholder="Enter location"
                          v-model="form.location"
                        >
                        <span class="help-block" 
                          v-if="errors.location"
                        >{{ errors.location[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Port Name</label>
                        <input type="text" class="form-control" placeholder="Enter port name"
                          v-model="form.port_name"
                        >
                        <span class="help-block" 
                          v-if="errors.port_name"
                        >{{ errors.port_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Name</label>
                        <input type="text" class="form-control" placeholder="Enter agent name"
                          v-model="form.agent_name"
                        >
                        <span class="help-block" 
                          v-if="errors.agent_name"
                        >{{ errors.agent_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Contact Person</label>
                        <input type="text" class="form-control" placeholder="Enter agent contact person"
                          v-model="form.agent_contact_person"
                        >
                        <span class="help-block" 
                          v-if="errors.agent_contact_person"
                        >{{ errors.agent_contact_person[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Phone</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">+91</span>
                          </div>
                          <input type="number" class="form-control" placeholder="Enter agent phone" v-mask="'##########'"
                            v-model="form.agent_phone"
                          >
                        </div>
                        <span class="help-block" 
                          v-if="errors.agent_phone"
                        >{{ errors.agent_phone[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Phone 2</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">+91</span>
                          </div>
                          <input type="text" class="form-control" placeholder="Enter agent phone 2"
                            v-model="form.agent_phone_2" v-mask="'##########'"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Email</label>
                        <input type="text" class="form-control" placeholder="Enter agent email"
                          v-model="form.agent_email"
                        >
                        <span class="help-block" 
                          v-if="errors.agent_email"
                        >{{ errors.agent_email[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Agent Address</label>
                        <input type="text" class="form-control" placeholder="Enter agent address"
                          v-model="form.agent_address"
                        >
                        <span class="help-block" 
                          v-if="errors.agent_address"
                        >{{ errors.agent_address[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operator Name</label>
                        <input type="text" class="form-control" placeholder="Enter operator name"
                          v-model="form.operator_name"
                        >
                        <span class="help-block" 
                          v-if="errors.operator_name"
                        >{{ errors.operator_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operator Contact Person</label>
                        <input type="text" class="form-control" placeholder="Enter operator contact person"
                          v-model="form.operator_contact_person"
                        >
                        <span class="help-block" 
                          v-if="errors.operator_contact_person"
                        >{{ errors.operator_contact_person[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operator Phone</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">+91</span>
                          </div>
                          <input type="number" class="form-control" placeholder="Enter operator phone"
                            v-model="form.operator_phone" v-mask="'##########'"
                          >
                        </div>
                        <span class="help-block" 
                          v-if="errors.operator_phone"
                        >{{ errors.operator_phone[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operator Phone 2</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">+91</span>
                          </div>
                          <input type="text" class="form-control" placeholder="Enter operator phone 2"
                            v-model="form.operator_phone_2" v-mask="'##########'"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Operator Email</label>
                        <input type="text" class="form-control" placeholder="Enter operator email"
                          v-model="form.operator_email"
                        >
                        <span class="help-block" 
                          v-if="errors.operator_email"
                        >{{ errors.operator_email[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Oil Major</label>
                        <v-select 
                          v-model="form.oil_major" 
                          :reduce="oil_major => oil_major.code" 
                          :options="oil_majors"
                        ></v-select>
                        <span class="help-block" 
                          v-if="errors.oil_major"
                        >{{ errors.oil_major[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Job</button>
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
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CreateJob',
  data: () => ({
    form: {
      'vessel_type': '',
      'operation': '',
      'oil_major': ''
    },
    operations: [
      {'label': "Select Operation", 'code': ""},
      {'label': "At Anchor", 'code': "At Anchor"},
      {'label': "At Sea", 'code': "At Sea"},
      {'label': "Bunkering", 'code': "Bunkering"},
      {'label': "Ballasting", 'code': "Ballasting"},
      {'label': "Cooling Down", 'code': "Cooling Down"},
      {'label': "Deballasting", 'code': "Deballasting"},
      {'label': "Discharging", 'code': "Discharging"},
      {'label': "Gassing Up", 'code': "Gassing Up"},
      {'label': "In Drydock", 'code': "In Drydock"},
      {'label': "Idle", 'code': "Idle"},
      {'label': "Loading", 'code': "Loading"},
      {'label': "River Transit", 'code': "River Transit"},
      {'label': "Repairs Afloat", 'code': "Repairs Afloat"},
      {'label': "STS Loading", 'code': "STS Loading"},
      {'label': "STS Discharging", 'code': "STS Discharging"},
    ],
    oil_majors: [
      {'label': "Select Oil Major", 'code': ""},
      {'label': "ADNOC", 'code': "ADNOC"},
      {'label': "ATC", 'code': "ATC"},
      {'label': "AMPOL", 'code': "AMPOL"},
      {'label': "BEICO", 'code': "BEICO"},
      {'label': "BP", 'code': "BP"},
      {'label': "BHP", 'code': "BHP"},
      {'label': "CONOCO PHILLIPS", 'code': "CONOCO PHILLIPS"},
      {'label': "ENI", 'code': "ENI"},
      {'label': "ENOC", 'code': "ENOC"},
      {'label': "EQUINOR", 'code': "EQUINOR"},
      {'label': "IDEMITSU", 'code': "IDEMITSU"},
      {'label': "IMT", 'code': "IMT"},
      {'label': "KOCH", 'code': "KOCH"},
      {'label': "KMG", 'code': "KMG"},
      {'label': "NAYARA", 'code': "NAYARA"},
      {'label': "NESTE", 'code': "NESTE"},
      {'label': "PHILLIPS66", 'code': "PHILLIPS66"},
      {'label': "PTT", 'code': "PTT"},
      {'label': "PETRONAS", 'code': "PETRONAS"},
      {'label': "RELIANCE", 'code': "RELIANCE"},
      {'label': "SHELL", 'code': "SHELL"},
    ],
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.post(`/jobs`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/jobs`)
      }
      catch(e) {

      }
    }
  }
}
</script>