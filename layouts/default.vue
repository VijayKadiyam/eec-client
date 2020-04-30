<template>
  <section class="hold-transition sidebar-mini layout-fixed"
    v-if="authenticated"
  >
    <!-- Site wrapper -->
    <div class="wrapper" >
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item d-none d-sm-inline-block">
            <button class="btn btn-link nav-link"
              @click="logout"
            >Logout</button>
          </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <h3><b>I-ADMIN</b></h3>
            </a>
          </li>
          <!-- <li class="nav-item">
            <nuxt-link :to="`/organizations/${organization.value}/whistle-blowers/create`">
              <button class="btn btn-danger">Send Message</button>
            </nuxt-link>
          </li> -->
        </ul>
      </nav>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <nuxt-link to="/" class="brand-link">
          <img :src="organization.logo_path ? (mediaUrl + organization.logo_path) : '/dist/img/AdminLTELogo.png'"
               alt="Logo"
               class="brand-image img-circle elevation-3"
               style="opacity: .8">
          <span class="brand-text font-weight-light">{{ organization.text ? organization.text : 'Not Selected' }}</span>
        </nuxt-link>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img class="img-circle elevation-2" alt="User Image" :src="mediaUrl + (user.attachment ? user.attachment : '/user.png')">
            </div>
            <div class="info">
              <a href="#" class="d-block">{{ user.first_name }}</a>
            </div>
          </div>

          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <template 
                v-for="(category, i) in categories"
              >
                <li class="nav-header"
                  v-if="category.title"
                >{{ category.title }}</li>
                <li class="nav-item has-treeview"
                  v-for="(item, j) in category.items"
                  :key="item.id"
                >
                  <nuxt-link :target="item.target" :to="item.link" :class="`nav-link ${$route.path == item.link ? 'active' : ''}`">
                    <i :class="`nav-icon far ${item.icon}`"></i>
                    <p>
                      {{ item.name }}
                      <i class="fas fa-angle-left right"
                        v-if="item.sub1Items"
                      ></i>
                    </p>
                  </nuxt-link>
                  <ul class="nav nav-treeview">
                    <li class="nav-item"
                      v-for="(sub1Item, k) in item.sub1Items"
                      :key="`sub1Item${k}`"
                    >
                      <nuxt-link :to="sub1Item.link" :class="`nav-link ${$route.path == sub1Item.link ? 'active' : ''}`">
                        <i class="far fa-circle nav-icon"></i>
                        <p>{{ sub1Item.name }}</p>
                      </nuxt-link>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>

      <nuxt></nuxt>

      <footer class="main-footer">
        <div class="float-right d-none d-sm-block">
          <img :src="organization.logo_path ? (mediaUrl + organization.logo_path) : '/dist/img/AdminLTELogo.png'" alt="Logo" style="width: 50px; height: 50px;">
        </div>
        <strong>Copyright &copy; <a href="https://www.aaibuzz.com">Aethon</a></strong>
        |
        <strong>Developed By <a href="https://www.aaibuzz.com">AaiBuzz</a>.</strong> <b>Version</b> 1.0.0
      </footer>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->
  </section>
  <section v-else>
      <nuxt></nuxt>
  </section>
</template>

<script>
export default {
  name: 'Root',
  data() {
    return {
      clipped: true,
      fixed: false
    }
  },
  computed: {
    drawer() {
      return this.authenticated
    },
    title() {
      return this.$auth.$state.user ? 
        (this.$auth.$state.user.companies.length ? 
          this.$auth.$state.user.companies[0].name + ' [' +this.$auth.$state.user.roles[0].name + ']' 
          : this.$store.getters['settings/organization'].text + ' [By Super Admin]') 
        : ''
    },
    organizationId() {
      return this.$auth.$state.user ? 
        (this.$auth.$state.user.companies.length ? 
          this.$auth.$state.user.companies[0].id
          : this.$store.getters['settings/organization'].value)
        : ''
    },
    role() {
      return this.user ? this.user.roles[0].name : '';
    },
    permissions() {
      return this.user ? this.user.roles[0].permissions.map(p => p.id) : ''
    },
    categories() {
      let categories = [

      ]
      categories.push({
        // title: 'Dashboard',
        'items': [
          {
            name: 'Home', icon: 'fa-envelope', link: '/',
            // sub1Items: [
            //   { name: 'D1', link: '/a' },
            //   { name: 'D2', link: '/b' }
            // ]
          },
        ]
      })
      if(this.permissions.indexOf(1)!= -1)
        categories.push({
          'items': [
            {
              name: 'Organizations', icon: 'fa-building', link: '/organizations',
            }
          ]
        })
      if(this.permissions.indexOf(1)!= -1)
        categories.push({
          'items': [
            {
              name: 'Settings', icon: 'fas fa-wrench', link: '/settings',
            }
          ]
        })
      categories.push({
        title: 'Master',
        'items': [
          {
            name: 'Inspectors', icon: 'fas fa-users', link: `/organizations/${this.organizationId}/employees`,
          }
        ]
      })
      categories.push({
        title: 'Scheduler',
        'items': [
          {
            name: 'Jobs', icon: 'fas fa-cogs', link: `/organizations/${this.organizationId}/jobs`,
          },
          {
            name: 'Assign Jobs', icon: 'fas fa-user-cog', link: `/organizations/${this.organizationId}/assign-jobs`,
          }
        ]
      })
      categories.push({
        title: 'Reports',
        'items': [
          {
            name: 'Job Reports', icon: 'fas fa-flag', link: `/organizations/${this.organizationId}/job-reports`,
          },
        ]
      })
      categories.push({
        title: 'User',
        'items': [
          {
            name: 'Leave / Unavailability', icon: 'fas fa-mug-hot', link: `/organizations/${this.organizationId}/leaves`,
          },
          // {
          //   name: 'Feedbacks', icon: 'fas fa-comments', link: `/organizations/${this.organizationId}/feedbacks`,
          // },
        ]
      })
      categories.push({
        title: 'Features',
        'items': [
          {
            name: 'Whistle Blowers', icon: 'fas fa-headset', link: `/organizations/${this.organizationId}/whistle-blowers`,
          },
          // {
          //   name: 'Feedbacks', icon: 'fas fa-comments', link: `/organizations/${this.organizationId}/feedbacks`,
          // },
        ]
      })
      categories.push({
        title: 'Operations',
        'items': [
          {
            name: 'Ticketing', icon: 'fas fa-headset', link: `/organizations/${this.organizationId}/tickets`,
          },
          // {
          //   name: 'Feedbacks', icon: 'fas fa-comments', link: `/organizations/${this.organizationId}/feedbacks`,
          // },
        ]
      })
      categories.push({
        title: 'Accounts',
        'items': [
          {
            name: 'Job Invoices', icon: 'fas fa-headset', link: `/organizations/${this.organizationId}/job-invoices`,
          },
          // {
          //   name: 'Feedbacks', icon: 'fas fa-comments', link: `/organizations/${this.organizationId}/feedbacks`,
          // },
        ]
      })
      categories.push({
        title: 'QHSSE',
        'items': [
          {
            name: 'Policies', icon: 'fas fa-vote-yea', link: `/organizations/${this.organizationId}/policies`,
          },
          {
            name: 'IMS Manual', icon: 'fas fa-book', link: `/organizations/${this.organizationId}/manuals`,
          },
          {
            name: 'Procedure Manual', icon: 'fas fa-shoe-prints', link: `/organizations/${this.organizationId}/procedures`,
          },
          {
            name: 'Forms', icon: 'fas fa-sticky-note', link: `/organizations/${this.organizationId}/forms`,
          },
          {
            name: 'AUDITS/BUSINESS PERFORMANCE VERIFICATION Reports', icon: 'fas fa-check-circle', link: `/organizations/${this.organizationId}/audit-reports`,
          },
          {
            name: 'Circulars', icon: 'fas fa-map-signs', link: `/organizations/${this.organizationId}/circulars`,
          },
          {
            name: 'Campaigns', icon: 'fas fa-newspaper', link: `/organizations/${this.organizationId}/campaigns`,
          },
          {
            name: 'Near Miss / Incident Reports', icon: 'fas fa-road', link: `/organizations/${this.organizationId}/incident-reports`,
          },
          {
            name: 'Best Practices', icon: 'fas fa-highlighter', link: `/organizations/${this.organizationId}/good-practices`,
          },
          {
            name: 'Risk Assessments', icon: 'fas fa-asterisk', link: `/organizations/${this.organizationId}/risk-assessments`,
          },
          {
            name: 'Library', icon: 'fas fa-book-reader', link: `/organizations/${this.organizationId}/libraries`,
          },
          {
            name: 'Records', icon: 'fas fa-flag', link: `/organizations/${this.organizationId}/records`,
          },
          {
            name: 'Observation Sheets', icon: 'fas fa-stroopwafel', link: `/organizations/${this.organizationId}/observation-sheets`,
          },
          {
            name: 'Sire Report', icon: 'fas fa-file-alt', link: `/organizations/${this.organizationId}/sire-reports`,
          },
          {
            name: 'Trainings', icon: 'fas fa-dumbbell', link: `/organizations/${this.organizationId}/trainings`,
          },
          {
            name: 'KPIs', icon: 'fas fa-key', link: `/organizations/${this.organizationId}/kpis`,
          },
        ]
      })
      return categories;
    }
  },
  // mounted() {
  //   this.logout()
  // },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style>
  .help-block {
    color: red !important;
  }
  .ck-editor__editable {
    min-height: 500px;
  }

  .content-wrapper, .login-page {
    background: url('/background1.jpg') !important;
    background-repeat: no-repeat !important; 
    background-size: cover !important;
  }

  .text-dark, .breadcrumb-item, .breadcrumb-item a, .login-logo a, .refresh {
    color: white !important;
  }

  .table td, .table th {
    padding: 0.4rem !important;
  }

  body {
    font-size: 0.9rem;
  }

  table {white-space:nowrap}
</style>
</style>