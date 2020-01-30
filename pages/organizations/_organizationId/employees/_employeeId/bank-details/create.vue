<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Bank Details</h1>
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
                  <h3 class="card-title">Add Inspector Bank Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Beneficiary Name</label>
                    <input type="text" class="form-control" placeholder="Enter benificary name"
                      v-model="form.benificiary_name"
                    >
                    <span class="help-block" 
                      v-if="errors.benificiary_name"
                    >{{ errors.benificiary_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Account No</label>
                    <input type="text" class="form-control" placeholder="Enter account no"
                      v-model="form.account_no"
                    >
                    <span class="help-block" 
                      v-if="errors.account_no"
                    >{{ errors.account_no[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Bank Name</label>
                    <input type="text" class="form-control" placeholder="Enter bank name"
                      v-model="form.bank_name"
                    >
                    <span class="help-block" 
                      v-if="errors.bank_name"
                    >{{ errors.bank_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Branch Name</label>
                    <input type="text" class="form-control" placeholder="Enter branch name"
                      v-model="form.branch_name"
                    >
                    <span class="help-block" 
                      v-if="errors.branch_name"
                    >{{ errors.branch_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Account Type</label>
                    <select class="form-control custom-select"
                      v-model="form.account_type"
                    >
                      <option value="">Select Type</option>
                      <option value="Savings">Savings</option>
                      <option value="Credit">Credit</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.account_type"
                    >{{ errors.account_type[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">IFSC Code</label>
                    <input type="text" class="form-control" placeholder="Enter ifsc code"
                      v-model="form.ifsc_code"
                    >
                    <span class="help-block" 
                      v-if="errors.ifsc_code"
                    >{{ errors.ifsc_code[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Swift Code</label>
                    <input type="text" class="form-control" placeholder="Enter swift code"
                      v-model="form.swift_code"
                    >
                    <span class="help-block" 
                      v-if="errors.swift_code"
                    >{{ errors.swift_code[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Bank Address</label>
                    <input type="text" class="form-control" placeholder="Enter bank address"
                      v-model="form.bank_address"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Remarks</label>
                    <input type="text" class="form-control" placeholder="Enter remarks"
                      v-model="form.remarks"
                    >
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Bank Details</button>
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
  name: 'CreateInspectorBankDetails',
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
      account_type: '',
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
        await this.$axios.post(`/users/${this.$route.params.employeeId}/bank_details`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>