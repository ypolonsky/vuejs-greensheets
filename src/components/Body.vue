<template>
  <!-- Body Content start -->
  <div class="col-md-12">
    <form action="changePassword" id="passwordForm" v-on:submit.prevent="updatePassword">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="pheader" style="display:inline;"><h2>Change I2E / Data Mart password for user: {{ user.nihNetworkId }}</h2></div>
        </div>
        <!-- end panel header -->

        <div class="panel-body">
          <div class="form-group row" style="margin-top: 0px; margin-bottom: 10px;">
            <div class="col-xs-4" :class="{'has-error': errors.has('passwordOne')}">
              <label class="form-check-label" for="passwordOne" style="white-space: nowrap;">
                Enter New Password:
              </label>
              <input id="passwordOne" name="passwordOne" class="form-control" placeholder="Enter new password" autofocus="autofocus" type="password" value=""
                     v-model="dataForm.passwordOne" v-validate="{required: true, min: 8, max: 30, allow: true, include3of4: true}"/>
              <div v-show="errors.has('passwordOne')"><div class="error help-block" style="color: #a94442;">{{ errors.first('passwordOne') }}</div></div>
            </div>
            <div class="col-xs-4" :class="{'has-error': errors.has('passwordTwo')}">
              <label class="form-check-label" for="passwordTwo" style="white-space: nowrap;">
                Confirm New Password:
              </label>
              <input id="passwordTwo" name="passwordTwo" class="form-control" placeholder="Re-enter new password" type="password" value=""
                     v-model="dataForm.passwordTwo" v-validate="{sameAsOne: true}"/>
              <div v-show="errors.has('passwordTwo')"><div class="error help-block" style="color: #a94442;">{{ errors.first('passwordTwo') }}</div></div>
            </div>
            <div class="col-xs-4">
              <div style="padding-bottom: 4px;">&nbsp;</div>
              <input id="submit" type="submit" value="Change" class="btn btn-primary pwd-submit" :disabled="cannotSubmit"/>
            </div>
          </div>

          <div class="form-group row" style="margin-top: 20px;">
            <div class="col-xs-12">
              <h4>Password Policy: your new password must meet the complexity requirements listed below.</h4>
              <ul>
                <li>The password cannot contain user's login name</li>
                <li>Password length must be at least 8 characters</li>
                <li>Ampersand (&amp;) and the space characters are not allowed</li>
                <li>Your new password must contain characters from at least three of the four categories listed below:</li>
                <ul>
                  <li>Uppercase letters (A-Z)</li>
                  <li>Lowercase letters (a-z)</li>
                  <li>Numerals (0-9)</li>
                  <li>Allowed special characters ( ! # $ % - _ = + &lt; &gt; )</li>
                </ul>
              </ul>
            </div>
          </div>

          <div class="form-group row" style="margin-top: 20px;">
            <div class="col-xs-12">
              <h4>Password Tips:</h4>
              <ul>
                <li>If you use Discoverer in the NCI Data Mart (known as NDMP), you should use this page to set your password.</li>
                <li>We recommend setting your I2E and Data Mart password to be the same as your NIH password to reduce the number of passwords to remember.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable semi */
import axios from 'axios'

  export default {
    data () {
      return {
        dataForm: {
          passwordOne: '',
          passwordTwo: ''
        }
      }
    },
    computed: {
      user: function () {
        return this.$store.getters.loggedUser.oracleId;
      },
      cannotSubmit: function () {
        let ret = (this.dataForm.passwordOne.length === 0 || this.dataForm.passwordTwo.length === 0 || this.$validator.errors.any());
        console.log('can Submit = ' + ret);
        return ret;
      }
    },
    methods: {
      updatePassword () {
        // Validate all fields
        console.log('About to submit: ', this.dataForm);
        axios.post(this.$i18n.t('url.changePassword', { host: window.webapihost }),
          {
            dataForm: this.dataForm,
            oracleId: this.$store.getters.loggedUser.oracleId
          }).then(response => {
          console.log(response.data);
          if (response.data.result === 'success') {
            this.$store.commit('updateAlert', { msgType: 'success', msgHeader: 'Success!', msg: this.$i18n.t('success') });
            this.$router.push('/alert');
          } else {
            this.$store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: response.data.message });
            this.$router.push('/alert');
          }
        }).catch((error) => {
          console.log('Cannot access URL http://.../changepassword/changePassword.json! ' + error);
          console.log('Cannot access URL user.json!' + error);
          this.$store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: 'Submission failed - ' + error + '<br/>Contact <a href="mailto:techsupport@nih.gov?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.' });
          this.$store.commit('updateAlert', { msgType: 'error', msgHeader: 'Error!', msg: this.$i18n.t('error.failedToSubmit', { error: error, email: 'techsupport@nih.gov' }) });
            // 'Submission failed - ' + error + '<br/>Contact <a href="mailto:techsupport@nih.gov?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.' });
          this.$router.push('/alert');
        })
      }
    },
    created () {
      const dict = {
        en: {
          attributes: {
            passwordOne: 'password'
          }
        }
      };
      this.$validator.localize(dict);
      this.$validator.extend('allow', {
        getMessage: field => {
          return 'The ' + field + ' field must contain only allowable characters'
        },
        validate: value => {
          // return false;
          return value.match(/^[a-zA-Z\d!#$%_=+<>-]+$/) != null;
        }
      })
      this.$validator.extend('include3of4', {
        getMessage: field => {
          return 'The ' + field + ' field must contain characters from at least three categories listed below'
        },
        validate: value => {
          console.log('Value to match: ' + value);
          let count = 0;
          if (value.match(/.*\d.*/) != null) {
            count++;
          }
          if (value.match(/.*[A-Z].*/) != null) {
            count++;
          }
          if (value.match(/.*[a-z].*/) != null) {
            count++;
          }
          if (value.match(/.*[!#$%_=+<>-].*/) != null) {
            count++;
          }
          return count >= 3;
        }
      })
      this.$validator.extend('sameAsOne', {
        getMessage: field => {
          return 'Both password fields must match'
        },
        validate: value => {
          // return false;
          return value === this.dataForm.passwordOne;
        }
      })
    }
  }
</script>

<style scoped>
  /** panel header customization **/
  .panel-default>.panel-heading,.panel-default>.panel-body  {
    background-color: #e9e9e9;
  }
  .panel.panel-default {
    margin-top: 20px;
  }
  .panel-default>.panel-body {
    border-top: solid thin;
    border-top-color: black;
  }
  .pheader>h2 {
    margin-top: 0.5em;
  }
</style>
