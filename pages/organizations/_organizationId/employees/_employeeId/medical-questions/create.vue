<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Medical Questions</h1>
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
                  <h3 class="card-title">Add Inspector Medical Questions</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Any Medicine Intake On Regular Basis (BP, Diabetis, etc).If Yes Please Provide Details</label>
                    <select class="form-control custom-select"
                      v-model="form.any_medical_intake"
                    >
                      <option value="">Select YES/NO</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.any_medical_intake"
                    >{{ errors.any_medical_intake[0] }}</span>
                  </div>
                  <div class="form-group"
                    v-if="form.any_medical_intake == 'YES'"
                  >
                    <label class="form-label">Details</label>
                    <textarea class="form-control" v-model="form.any_medical_intake_details" placeholder="Enter Details"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Have You Undergone Any Surgery In The Past(Yes / No). If Yes Provide Details.</label>
                    <select class="form-control custom-select"
                      v-model="form.any_surgery_in_past"
                    >
                      <option value="">Select YES/NO</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.any_surgery_in_past"
                    >{{ errors.any_surgery_in_past[0] }}</span>
                  </div>
                  <div class="form-group"
                    v-if="form.any_surgery_in_past == 'YES'"
                  >
                    <label class="form-label">Details</label>
                    <textarea class="form-control" v-model="form.any_surgery_in_past_details" placeholder="Enter Details"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Have You Consulted A Doctor During The Last 12 Months For Any Major Illness Or Accident (Yes/No).If Yes Provide Details</label>
                    <select class="form-control custom-select"
                      v-model="form.last_12_months_consulting"
                    >
                      <option value="">Select YES/NO</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.last_12_months_consulting"
                    >{{ errors.last_12_months_consulting[0] }}</span>
                  </div>
                  <div class="form-group"
                    v-if="form.last_12_months_consulting == 'YES'"
                  >
                    <label class="form-label">Details</label>
                    <textarea class="form-control" v-model="form.last_12_months_consulting_details" placeholder="Enter Details"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Have You Ever Been Tested Positive For Any Drug And Alcohol Test(Yes / No).If Yes Provide Details</label>
                    <select class="form-control custom-select"
                      v-model="form.positive_of_alcohol_test"
                    >
                      <option value="">Select YES/NO</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.positive_of_alcohol_test"
                    >{{ errors.positive_of_alcohol_test[0] }}</span>
                  </div>
                  <div class="form-group"
                    v-if="form.positive_of_alcohol_test == 'YES'"
                  >
                    <label class="form-label">Details</label>
                    <textarea class="form-control" v-model="form.positive_of_alcohol_test_details" placeholder="Enter Details"></textarea>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Inspector Medical Details</button>
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
  name: 'CreateInspectorMedicalDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
      'any_medical_intake': '',
      'any_surgery_in_past': '',
      'last_12_months_consulting': '',
      'positive_of_alcohol_test': ''
    },
  }),
  methods: {
    async store() {
      try {
        await this.$axios.post(`/users/${this.$route.params.employeeId}/medical_details`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>