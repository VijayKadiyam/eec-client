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
                  :link="`/organizations/${organization.value}/employees`"
                  title="Hi"
                >
                </back-button>
                Full Details of <b>{{ form.first_name }} {{ form.last_name }}</b></h1>
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
                        <th>Actions</th>
                        <th>Emp ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOB</th>
                        <th>Marital Status</th>
                        <th>Skype ID</th>
                        <th>CV/Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="10">Loading...</td>
                      </tr>
                      <tr>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                        </td>
                        <td>{{ form.emp_code }}</td>
                        <td><img style="width: 50px; height: 50px;" :src="mediaUrl + (form.attachment ? form.attachment : '/user.png')"></td>
                        <td>{{ form.first_name }} {{ form.last_name }}</td>
                        <td>{{ form.email }}</td>
                        <td>{{ form.phone_code }} {{ form.phone }}</td>
                        <td>{{ form.gender }}</td>
                        <td>{{ form.age }}</td>
                        <td>{{ form.dob }}</td>
                        <td>{{ form.marital_status }}</td>
                        <td>{{ form.skype_id }}</td>
                        <td><a :href="mediaUrl + form.cv_path" target="_blank">{{ form.cv_path }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Academic Qualifications -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Academic Qualifications</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/academic-qualifications/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Qualification</th>
                        <th>Stream</th>
                        <th>Details</th>
                        <th>Year of Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(aq, i) in form.academic_qualifications"
                        :key="`aq${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/academic-qualifications/${aq.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delAq(aq.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ aq.exam_name }}</td>
                        <td>{{ aq.stream }}</td>
                        <td>{{ aq.details }}</td>
                        <td>{{ aq.yr_of_passing }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Professional Courses -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Professional Courses</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/professional-courses/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Name of course</th>
                        <th>Date of issue</th>
                        <!-- <th>Date of expiry</th> -->
                        <th>Place of issue</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(pc, i) in form.professional_courses"
                        :key="`pc${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/professional-courses/${pc.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delPc(pc.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ pc.name_of_course }}</td>
                        <td>{{ pc.date_of_issue }}</td>
                        <!-- <td>{{ pc.date_of_expiry }}</td> -->
                        <td>{{ pc.place_of_issue }}</td>
                        <td><a :href="mediaUrl + pc.image_path" target="_blank">{{ pc.image_path }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Additional Qualifications -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Additional Qualifications</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/additional-qualifications/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(aq, i) in form.additional_qualifications"
                        :key="`aq${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/additional-qualifications/${aq.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delAdq(aq.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ aq.name }}</td>
                        <td>{{ aq.description }}</td>
                        <td><a :href="mediaUrl + aq.image_path" target="_blank">{{ aq.image_path }}</a></td>
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
                  <h3 class="card-title"><u>NEXT OF KIN</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/relations/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Relation</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(rel, i) in form.relations"
                        :key="`rel${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/relations/${rel.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delRel(rel.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ rel.first_name }} {{ rel.last_name }}</td>
                        <td>{{ rel.email }}</td>
                        <td>{{ rel.phone }} <br> {{ rel.alt_phone }}</td>
                        <td>{{ rel.relation }}</td>
                        <td>{{ rel.address_1 }}, {{ rel.address_2 }}, {{ rel.city }}, {{ rel.state }}, {{ rel.country }}, {{ rel.pincode }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Emergencies -->
            <!-- <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Emergencies</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/emergencies/create`">Add New</nuxt-link>
                </div>
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Relation</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(emer, i) in form.emergencies"
                        :key="`emer${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/emergencies/${emer.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delEme(emer.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ emer.first_name }} {{ emer.last_name }}</td>
                        <td>{{ emer.email }}</td>
                        <td>{{ emer.phone }} <br> {{ emer.alt_phone }}</td>
                        <td>{{ emer.relation }}</td>
                        <td>{{ emer.address_1 }}, {{ emer.address_2 }}, {{ emer.city }}, {{ emer.state }}, {{ emer.country }}, {{ emer.pincode }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> -->

            <!-- Addresses -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Addresses</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/addresses/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Address Type</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Pincode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(address, i) in form.addresses"
                        :key="`address${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/addresses/${address.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delAdd(address.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ address.address_type }}</td>
                        <td>{{ address.address_1 }}</td>
                        <td>{{ address.address_2 }}</td>
                        <td>{{ address.city }}</td>
                        <td>{{ address.state }}</td>
                        <td>{{ address.country }}</td>
                        <td>{{ address.pincode }}</td>
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
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/bank-details/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Account Type</th>
                        <th>Bank Name</th>
                        <th>Branch Name</th>
                        <th>Account No</th>
                        <th>IFSC Code</th>
                        <th>Beneficary Name</th>
                        <th>Bank Address</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(bd, i) in form.bank_details"
                        :key="`bd${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/bank-details/${bd.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delBan(bd.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ bd.account_type }}</td>
                        <td>{{ bd.bank_name }}</td>
                        <td>{{ bd.branch_name }}</td>
                        <td>{{ bd.account_no }}</td>
                        <td>{{ bd.ifsc_code }}</td>
                        <td>{{ bd.benificiary_name }}</td>
                        <td>{{ bd.bank_address }}</td>
                        <td>{{ bd.remarks }}</td>
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
                  <h3 class="card-title"><u>Passport</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/passports/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Name on Passport</th>
                        <th>Passport Number</th>
                        <th>Place of issue</th>
                        <th>Date of issue</th>
                        <th>Date of expiry</th>
                        <th>Country</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(passport, i) in form.passports"
                        :key="`passport${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/passports/${passport.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delPas(passport.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ passport.name_on_passport }}</td>
                        <td>{{ passport.passport_number }}</td>
                        <td>{{ passport.place_of_issue }}</td>
                        <td>{{ passport.date_of_issue }}</td>
                        <td>{{ passport.date_of_expiry }}</td>
                        <td>{{ passport.country }}</td>
                        <td><a :href="mediaUrl + passport.attachment" target="_blank">{{ passport.attachment }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Visas -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Visa</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/visas/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Country</th>
                        <th>Is Schengen</th>
                        <th>Entry Type</th>
                        <th>Type of Visa</th>
                        <th>Date of issue</th>
                        <th>Date of expiry</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="9">Loading...</td>
                      </tr>
                      <tr v-for="(visa, i) in form.visas"
                        :key="`visa${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/visas/${visa.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delVis(visa.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ visa.country }}</td>
                        <td>{{ visa.is_shengen }}</td>
                        <td>{{ visa.entry_type }}</td>
                        <td>{{ visa.type_of_visa }}</td>
                        <td>{{ visa.date_of_issue }}</td>
                        <td>{{ visa.date_of_expiry }}</td>
                        <td><a :href="mediaUrl + visa.attachment" target="_blank">{{ visa.attachment }}</a></td>
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
                  <h3 class="card-title"><u>Seaman Booklet</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/seaman-books/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Book Number</th>
                        <th>Place of issue</th>
                        <th>Date of issue</th>
                        <th>Date of expiry</th>
                        <th>Country</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="8">Loading...</td>
                      </tr>
                      <tr v-for="(seaman_book, i) in form.seaman_books"
                        :key="`seaman_book${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/seaman-books/${seaman_book.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delSea(seaman_book.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ seaman_book.book_number }}</td>
                        <td>{{ seaman_book.place_of_issue }}</td>
                        <td>{{ seaman_book.date_of_issue }}</td>
                        <td>{{ seaman_book.date_of_expiry }}</td>
                        <td>{{ seaman_book.country }}</td>
                        <td><a :href="mediaUrl + seaman_book.attachment" target="_blank">{{ seaman_book.attachment }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Vaccinations -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Vaccinations</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/vaccinations/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Vaccination Type</th>
                        <th>Certificate no</th>
                        <th>Date of Expiry</th>
                        <th>Other Details</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="8">Loading...</td>
                      </tr>
                      <tr v-for="(vaccination, i) in form.vaccinations"
                        :key="`vaccination${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/vaccinations/${vaccination.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delVac(vaccination.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ vaccination.vaccination_type }}</td>
                        <td>{{ vaccination.certificate_no }}</td>
                        <td>{{ vaccination.date_of_expiry }}</td>
                        <td>{{ vaccination.other_details }}</td>
                        <td><a :href="mediaUrl + vaccination.attachment" target="_blank">{{ vaccination.attachment }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Sires -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>OCIMF SIRE accreditation</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/sires/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>ID Number</th>
                        <th>Expiry Date</th>
                        <th>Last Audit Date</th>
                        <th>Type</th>
                        <th>SIRE ID Card</th>
                        <th>Audit performance appraisal report</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="7">Loading...</td>
                      </tr>
                      <tr v-for="(sire, i) in form.sires"
                        :key="`sire${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/sires/${sire.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delSir(sire.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ sire.id_number }}</td>
                        <td>{{ sire.expiry_date }}</td>
                        <td>{{ sire.last_audit_date }}</td>
                        <td>{{ sire.type }}</td>
                        <td><a :href="mediaUrl + sire.attachment" target="_blank">{{ sire.attachment }}</a></td>
                        <td><a :href="mediaUrl + sire.report" target="_blank">{{ sire.report }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Courses -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>OCIMF Refresher Courses</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/ocimf/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Name of Course</th>
                        <th>Course Date</th>
                        <th>End Date</th>
                        <th>Place of Course</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="5">Loading...</td>
                      </tr>
                      <tr v-for="(ocimf, i) in form.ocimf_refresher_courses"
                        :key="`ocimf${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/ocimf/${ocimf.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delOci(ocimf.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ ocimf.name_of_course }}</td>
                        <td>{{ ocimf.course_date }}</td>
                        <td>{{ ocimf.end_date }}</td>
                        <td>{{ ocimf.place_of_course }}</td>
                        <td><a :href="mediaUrl + ocimf.attachment" target="_blank">{{ ocimf.attachment }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Medicals -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Medicals</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/medicals/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Report Number</th>
                        <th>Issue Date</th>
                        <th>Place of Issue</th>
                        <th>Date of Expiry</th>
                        <th>Doctor Name</th>
                        <th>Medically Fit</th>
                        <th>Remarks</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="10">Loading...</td>
                      </tr>
                      <tr v-for="(medical, i) in form.medicals"
                        :key="`medical${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/medicals/${medical.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delMed(medical.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ medical.report_number }}</td>
                        <td>{{ medical.issue_date }}</td>
                        <td>{{ medical.place_of_issue }}</td>
                        <td>{{ medical.date_of_expiry }}</td>
                        <td>{{ medical.doctor_name }}</td>
                        <td>{{ medical.fit }}</td>
                        <td>{{ medical.remarks }}</td>
                        <td><a :href="mediaUrl + medical.attachment" target="_blank">{{ medical.attachment }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>

            <!-- Medical Questions -->
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><u>Medical/Health Declaration (Valid for next 6 Months)</u></h3> &nbsp;
                  <nuxt-link class="btn btn-sm btn-info float-sm-right" :to="`/organizations/${organization.value}/employees/${form.id}/medical-questions/create`">Add New</nuxt-link>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Sr. No.</th>
                        <th>Date</th>
                        <th>Any Medicine Intake On Regular Basis</th>
                        <th>Have You Undergone Any Surgery In The Past</th>
                        <th>Have You Consulted A Doctor For Any Illness Or Accident </th>
                        <th>Have You Ever Been Tested Positive For Any Drug And Alcohol Test</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="10">Loading...</td>
                      </tr>
                      <tr v-for="(medical, i) in form.medical_details"
                        :key="`medical${i}`"
                      >
                        <td class="w-1">
                          <nuxt-link class="icon" :to="`/organizations/${organization.value}/employees/${form.id}/medical-questions/${medical.id}`">
                            <i class="fa fa-edit"></i>
                          </nuxt-link>
                          <nuxt-link class="icon" to="">
                            <span @click="delMde(medical.id)">
                              <i class="fa fa-trash"></i>
                            </span>
                          </nuxt-link>
                        </td>
                        <td>{{ i + 1 }}</td>
                        <td>{{ medical.date }}</td>
                        <td>{{ medical.any_medical_intake }}</td>
                        <td>{{ medical.any_surgery_in_past }}</td>
                        <td>{{ medical.last_12_months_consulting }}</td>
                        <td>{{ medical.positive_of_alcohol_test }}</td>
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
import BackButton from '@/components/back-button.vue'

export default {
  name: 'ManageFullDetailsOfInspector',
  async asyncData({$axios, params}) {
    
  },
  data:() =>  ({
    searchData: '',
    loading: false,
    form: {
      roles: [],
      relations: [], 
      emergencies: [], 
      bank_details: [], 
      passports: [], 
      addresses: [], 
      seaman_books: [], 
      vaccinations: [], 
      ocimf_refresher_courses: [], 
      visas: [], 
      medicals: [], 
      sires: [], 
      medical_details: [],
      relations: [],
    }
  }),
  async mounted() {
    await this.getData()
  },
  components: {
    BackButton
  },
  methods: {
    async getData() {
      let inspector = await this.$axios.get(`/users/${this.$route.params.employeeId}`)
      this.form = inspector.data.data
    },
    async delAq(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/academic_qualifications/${id}`)
        this.getData()
      }
    },
    async delPc(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/professional_courses/${id}`)
        this.getData()
      }
    },
    async delAdq(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/additional_qualifications/${id}`)
        this.getData()
      }
    },
    async delRel(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/relations/${id}`)
        this.getData()
      }
    },
    async delEme(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/emergencies/${id}`)
        this.getData()
      }
    },
    async delBank(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/bank_details/${id}`)
        this.getData()
      }
    },
    async delBan(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/bank_details/${id}`)
        this.getData()
      }
    },
    async delAdd(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/addresses/${id}`)
        this.getData()
      }
    },
    async delPas(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/passports/${id}`)
        this.getData()
      }
    },
    async delVis(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/visas/${id}`)
        this.getData()
      }
    },
    async delSea(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/seaman_books/${id}`)
        this.getData()
      }
    },
    async delVac(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/vaccinations/${id}`)
        this.getData()
      }
    },
    async delSir(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/sires/${id}`)
        this.getData()
      }
    },
    async delOci(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/ocimf_refresher_courses/${id}`)
        this.getData()
      }
    },
    async delMed(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/medicals/${id}`)
        this.getData()
      }
    },
    async delMde(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/users/${this.$route.params.employeeId}/medical_details/${id}`)
        this.getData()
      }
    },
  }
}
</script>