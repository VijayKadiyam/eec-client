<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Full Details of <b>{{ form.first_name }} {{ form.last_name }}</b></h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organizationId}/employees`">Inspectors</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ form.first_name }} {{ form.last_name }}</li>
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

            <!-- Basic Details -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Basic Details</u></h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOB</th>
                        <th>Marital Status</th>
                        <th>Skype ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="10">Loading...</td>
                      </tr>
                      <tr>
                        <td>{{ form.emp_code }}</td>
                        <td>{{ form.first_name }} {{ form.last_name }}</td>
                        <td>{{ form.email }}</td>
                        <td>{{ form.phone }}</td>
                        <td>{{ form.gender }}</td>
                        <td>{{ form.age }}</td>
                        <td>{{ form.dob }}</td>
                        <td>{{ form.marital_status }}</td>
                        <td>{{ form.skype_id }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Relations -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Relations</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/relations/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Relation</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(rel, i) in form.relations"
                        :key="`rel{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ rel.first_name }} {{ rel.last_name }}</td>
                        <td>{{ rel.email }}</td>
                        <td>{{ rel.phone }} <br> {{ rel.alt_phone }}</td>
                        <td>{{ rel.relation }}</td>
                        <td>{{ rel.address_1 }}, {{ rel.address_2 }}, {{ rel.city }}, {{ rel.state }}, {{ rel.country }}, {{ rel.pincode }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/relations/${rel.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Emergencies -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Emergencies</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/emergencies/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Relation</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(emer, i) in form.emergencies"
                        :key="`emer{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ emer.first_name }} {{ emer.last_name }}</td>
                        <td>{{ emer.email }}</td>
                        <td>{{ emer.phone }} <br> {{ emer.alt_phone }}</td>
                        <td>{{ emer.relation }}</td>
                        <td>{{ emer.address_1 }}, {{ emer.address_2 }}, {{ emer.city }}, {{ emer.state }}, {{ emer.country }}, {{ emer.pincode }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/emergencies/${emer.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Addresses -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Addresses</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/addresses/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Address Type</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Pincode</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(address, i) in form.addresses"
                        :key="`address{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ address.address_type }}</td>
                        <td>{{ address.address_1 }}</td>
                        <td>{{ address.address_2 }}</td>
                        <td>{{ address.city }}</td>
                        <td>{{ address.state }}</td>
                        <td>{{ address.country }}</td>
                        <td>{{ address.pincode }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/addresses/${address.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Bank Details -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Bank Details</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/bank-details/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Account Type</th>
                        <th>Bank Name</th>
                        <th>Branch Name</th>
                        <th>Account No</th>
                        <th>IFSC Code</th>
                        <th>Benificary Name</th>
                        <th>Bank Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(bd, i) in form.bank_details"
                        :key="`bd{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ bd.account_type }}</td>
                        <td>{{ bd.bank_name }}</td>
                        <td>{{ bd.branch_name }}</td>
                        <td>{{ bd.account_no }}</td>
                        <td>{{ bd.ifsc_code }}</td>
                        <td>{{ bd.benificiary_name }}</td>
                        <td>{{ bd.bank_address }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/bank-details/${bd.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Passports -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Passports</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/passports/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name on Passport</th>
                        <th>Passport Number</th>
                        <th>Place of issue</th>
                        <th>Date of issue</th>
                        <th>Date of expiry</th>
                        <th>Country</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(passport, i) in form.passports"
                        :key="`passport{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ passport.name_on_passport }}</td>
                        <td>{{ passport.passport_number }}</td>
                        <td>{{ passport.place_of_issue }}</td>
                        <td>{{ passport.date_of_issue }}</td>
                        <td>{{ passport.date_of_expiry }}</td>
                        <td>{{ passport.country }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/passports/${passport.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Seaman Books -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Seaman Books</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info" :to="`/organizations/${organization.value}/employees/${form.id}/seaman-books/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Book Number</th>
                        <th>Place of issue</th>
                        <th>Date of issue</th>
                        <th>Date of expiry</th>
                        <th>Country</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="8">Loading...</td>
                      </tr>
                      <tr v-for="(seaman_book, i) in form.seaman_books"
                        :key="`seaman_book{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ seaman_book.book_number }}</td>
                        <td>{{ seaman_book.place_of_issue }}</td>
                        <td>{{ seaman_book.date_of_issue }}</td>
                        <td>{{ seaman_book.date_of_expiry }}</td>
                        <td>{{ seaman_book.country }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/seaman-books/${seaman_book.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
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
export default {
  name: 'ManageFullDetailsOfInspector',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      form: inspector.data.data
    }
  },
  data:() =>  ({
    searchData: '',
    loading: false
  }),
  mounted() {
  },
  methods: {
  }
}
</script>