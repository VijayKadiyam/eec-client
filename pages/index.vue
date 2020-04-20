<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Dashboard</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <!-- Inspector boxes -->
          <div class="row">
            <div class="col-12 col-sm-6 col-md-3"
              v-for="(inspectorTab, t) in inspectorTabs"
              :key="`inspectorTab${t}`"
            >
              <nuxt-link :to="`/organizations/${organization.value}/employees`">
                <div class="info-box">
                  <span :class="'info-box-icon ' + inspectorTab.color + ' elevation-1'"><i :class="inspectorTab.icon"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text" style="color: black;">{{ inspectorTab.name }}</span>
                    <span class="info-box-number">
                      {{ inspectorTab.count }}
                    </span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </nuxt-link>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <!-- Job boxes -->
          <div class="row">
            <div class="col-12 col-sm-6 col-md-3"
              v-for="(jobTab, t) in jobTabs"
              :key="`jobTab${t}`"
            >
              <nuxt-link :to="`/organizations/${organization.value}/jobs`">
                <div class="info-box">
                  <span :class="'info-box-icon ' + jobTab.color + ' elevation-1'"><i :class="jobTab.icon"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text" style="color: black;">{{ jobTab.name }}</span>
                    <span class="info-box-number">
                      {{ jobTab.count }}
                    </span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </nuxt-link>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <!-- Main row -->
          <div class="row">
            <!-- Map and Invoice Raised -->
            <div class="col-md-8">
              <GmapMap
                :center="{lat:10, lng:10}"
                :zoom="8"
                map-type-id="terrain"
                style="width: 100%; height: 500px"
              >
                <GmapMarker
                  v-for="(m, index) in markers1"
                  :key="`m${index}`"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center=m.position"
                  :icon="'marker1.png'"
                />
                <GmapMarker
                  v-for="(m, index) in markers2"
                  :key="`index${index}`"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center=m.position"
                  :icon="'marker2.png'"
                />
              </GmapMap>

              <br>

              <!-- TABLE: Invoices -->
              <div class="card">
                <div class="card-header border-transparent">
                  <h3 class="card-title">Invoices Raised</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body p-0">
                  <div class="table-responsive">
                    <table class="table m-0">
                      <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Popularity</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR9842</a></td>
                        <td>Call of Duty IV</td>
                        <td><span class="badge badge-success">Shipped</span></td>
                        <td>
                          <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR1848</a></td>
                        <td>Samsung Smart TV</td>
                        <td><span class="badge badge-warning">Pending</span></td>
                        <td>
                          <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR7429</a></td>
                        <td>iPhone 6 Plus</td>
                        <td><span class="badge badge-danger">Delivered</span></td>
                        <td>
                          <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR7429</a></td>
                        <td>Samsung Smart TV</td>
                        <td><span class="badge badge-info">Processing</span></td>
                        <td>
                          <div class="sparkbar" data-color="#00c0ef" data-height="20">90,80,-90,70,-61,83,63</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR1848</a></td>
                        <td>Samsung Smart TV</td>
                        <td><span class="badge badge-warning">Pending</span></td>
                        <td>
                          <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR7429</a></td>
                        <td>iPhone 6 Plus</td>
                        <td><span class="badge badge-danger">Delivered</span></td>
                        <td>
                          <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR9842</a></td>
                        <td>Call of Duty IV</td>
                        <td><span class="badge badge-success">Shipped</span></td>
                        <td>
                          <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.table-responsive -->
                </div>
                <!-- /.card-body -->
                <div class="card-footer clearfix">
                  <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a>
                  <a href="javascript:void(0)" class="btn btn-sm btn-secondary float-right">View All Orders</a>
                </div>
                <!-- /.card-footer -->
              </div>
              <!-- /.Invoices -->

              <!-- USERS LIST -->
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Inspectors</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body p-0">
                  <ul class="users-list clearfix">
                    <li
                      v-for="(emp, u) in users"
                      :key="`emp${u}`"
                    >
                      <nuxt-link :to="`/organizations/${organization.value}/employees/${emp.id}/full`">
                        <img style="width: 128px; height: 128px;" :src="mediaUrl + (emp.attachment ? emp.attachment : '/user.png')" :alt="emp.first_name">
                        <a class="users-list-name" href="#">{{ emp.first_name }}</a>
                        <span class="users-list-date">{{ emp.emp_code }}</span>
                      </nuxt-link>
                    </li>
                  </ul>
                  <!-- /.users-list -->
                </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                  <nuxt-link :to="`/organizations/${organization.value}/employees`">
                    View All Inspectors
                  </nuxt-link>
                </div>
                <!-- /.card-footer -->
              </div>
              <!--/. USERS LIST -->
            </div>


            <!-- Map Controls and Payment made to the inspectors -->
            <div class="col-md-4">
              <!-- Info Boxes Style 2 -->
              <div class="info-box mb-3 bg-warning">
                <span class="info-box-icon"><i class="fa fa-map-marker"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">USA (Click to view)</span> 
                  <span class="info-box-number">3 Inspectors | 2 Jobs</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
              <div class="info-box mb-3 bg-success">
                <span class="info-box-icon"><i class="fa fa-map-marker"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">Europe (Click to view)</span>
                  <span class="info-box-number">3 Inspectors | 2 Jobs</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
              <div class="info-box mb-3 bg-primary">
                <span class="info-box-icon"><i class="fa fa-map-marker"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">UAE (Click to view)</span>
                  <span class="info-box-number">3 Inspectors | 2 Jobs</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
              <div class="info-box mb-3 bg-danger">
                <span class="info-box-icon"><i class="fa fa-map-marker"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">Asia (Click to view)</span>
                  <span class="info-box-number">3 Inspectors | 2 Jobs</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
              <div class="info-box mb-3 bg-info">
                <span class="info-box-icon"><i class="fa fa-map-marker"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">Australia (Click to view)</span>
                  <span class="info-box-number">3 Inspectors | 2 Jobs</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->

              <!-- PRODUCT LIST -->
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Payments made to inspector</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body p-0">
                  <ul class="products-list product-list-in-card pl-2 pr-2">
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">Samsung TV
                          <span class="badge badge-warning float-right">$1800</span></a>
                        <span class="product-description">
                          Samsung 32" 1080p 60Hz LED Smart HDTV.
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">Bicycle
                          <span class="badge badge-info float-right">$700</span></a>
                        <span class="product-description">
                          26" Mongoose Dolomite Men's 7-speed, Navy Blue.
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">
                          Xbox One <span class="badge badge-danger float-right">
                          $350
                        </span>
                        </a>
                        <span class="product-description">
                          Xbox One Console Bundle with Halo Master Chief Collection.
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->
                    <li class="item">
                      <div class="product-img">
                        <img src="dist/img/default-150x150.png" alt="Product Image" class="img-size-50">
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                          <span class="badge badge-success float-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    <!-- /.item -->

                  </ul>
                </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                  <a href="javascript:void(0)" class="uppercase">View All Products</a>
                </div>
                <!-- /.card-footer -->
              </div>
              <!-- /.card -->
            </div>
            <!-- /.col -->
          </div>

          <br>

          <br><br>

        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

  </section>
</template>

<script>

export default {
  name: 'Dashboard', 
  data: () => ({
    count: {},
    markers1: [
      {
        position: {
          lat: 10.0,
          lng: 10.0
        }
      }, 
      {
        position: {
          lat: 11.0,
          lng: 11.0
        }
      },
      {
        position: {
          lat: 9.0,
          lng: 9.0
        }
      },
    ],
    markers2: [
      {
        position: {
          lat: 10.0,
          lng: 9.0
        }
      },
      {
        position: {
          lat: 9.0,
          lng: 11.0
        }
      }
    ],
    inspectorTabs: [],
    jobTabs: [],
    users: []
  }),
  created() {
    this.getData()
  },
  async mounted() {
    let response = await this.$axios.get('/count')
    this.count = response.data.data
    this.users = response.data.users
  },
  methods: {
    async getData() {
      let count = await this.$axios.get('count')
      count = count.data.data
      console.log(count)
      this.inspectorTabs = [
        { name: 'Total No. of Inspectors', icon: 'fas fa-users', color: 'bg-info', count: count.inspectors.total },
        { name: 'No. of Inspectors Engaged', icon: 'fas fa-users-cog', color: 'bg-danger', count: count.inspectors.engaged },
        { name: 'No. of Inspectors on Leave', icon: 'fas fa-skiing', color: 'bg-success', count: count.inspectors.on_leave },
        { name: 'Inspectors with no Job', icon: 'fas fa-user-lock', color: 'bg-warning', count: count.inspectors.no_job },
      ]
      this.jobTabs = [
        { name: 'On Going Jobs', icon: 'fas fa-briefcase', color: 'bg-info', count: count.jobs.on_going },
        { name: 'Completed Jobs', icon: 'fas fa-tasks', color: 'bg-danger', count: count.jobs.completed },
        { name: 'New Jobs With No Inspector', icon: 'fas fa-network-wired', color: 'bg-success', count: count.jobs.no_inspector },
        { name: 'No of Inspections Cancelled', icon: 'far fa-window-close', color: 'bg-warning', count: count.jobs.cancelled },
      ]
    }
  }
}
</script>
