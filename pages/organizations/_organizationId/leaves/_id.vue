<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Leave Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/leaves`">Leavess</nuxt-link>
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
                  <h3 class="card-title">Add Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Select User</label>
                    <v-select 
                      v-model="form.user_id" 
                      :reduce="user => user.code" 
                      :options="users"
                    ></v-select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">From Date</label>
                    {{ form.from_date }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customFromFormatter"
                        value="form.from_date"
                      />
                    </client-only>
                    <span class="help-block" 
                      v-if="errors.from_date"
                    >{{ errors.from_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">To Date</label>
                    {{ form.to_date }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customToFormatter"
                        value="form.to_date"
                      />
                    </client-only>
                    <span class="help-block" 
                      v-if="errors.to_date"
                    >{{ errors.to_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" v-model="form.description" placeholder="Add description"></textarea>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Save' }}
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
import moment from 'moment'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'UpdateUserLeave',
  async asyncData({$axios, params, query}) {
    let leaves = await $axios.get(`/users/${query.userId}/user_leaves/${params.id}`)
    return {
      form: leaves.data.data,
    }
  },
  data: () => ({
    form: {
      user_id: '',
      description: '',
      from_date: '',
      to_date: ''
    },
    loading: false,
    users: []
  }),
  async mounted() {
    this.form.user_id = parseInt(this.form.user_id)
    await this.getUsers()
  },
  methods: {
    async getUsers() {
      this.items = []
      this.loading = true
      let items = await this.$axios.get(`/users?role_id=3`)
      let users = items.data.data
      users.forEach((user) => {
        user.label = user.first_name + user.last_name
        user.code = user.id
      })
      users.unshift({
        'label': "Select user",
        'code': "",
      })
      this.users = users
      this.loading = false
    },
    customFromFormatter(date) {
      this.form.from_date = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
    customToFormatter(date) {
      this.form.to_date = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
    async store() {
      try {
        this.loading = true
        // this.form.user_id = this.user.id
        await this.$axios.patch(`/users/${this.form.user_id}/user_leaves/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/leaves`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
  }
}
</script>