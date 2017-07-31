// SparkleXrm.UnitTests.js
(function(){
Type.registerNamespace('SparkleXrm.UnitTests');SparkleXrm.UnitTests.ActionTests=function(){}
SparkleXrm.UnitTests.ActionTests.WinOpportunity=function(assert){assert.expect(1);var $0='Unit Test'+Date.get_now().toISOString();var $1=new SparkleXrm.Sdk.Entity('account');$1.setAttributeValue('name',$0);$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;var $2=new SparkleXrm.Sdk.Entity('opportunity');$2.setAttributeValue('customerid',$1.toEntityReference());$2.setAttributeValue('name',$0);SparkleXrm.Sdk.WebApiOrganizationServiceProxy.addNavigationPropertyMetadata('opportunity','customerid','account,contact');$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).value;var $3=new SparkleXrm.Sdk.Messages.WinOpportunityRequest();var $4=new SparkleXrm.Sdk.Entity('opportunityclose');$4.setAttributeValue('subject','Win!!');$4.setAttributeValue('opportunityid',$2.toEntityReference());$3.OpportunityClose=$4;$3.Status=new SparkleXrm.Sdk.OptionSetValue(3);try{SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('WinOpportunity',SparkleXrm.Sdk.Messages.WinOpportunityResponse);var $5=SparkleXrm.Sdk.OrganizationServiceProxy.execute($3);var $6=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($2.logicalName,$2.id,['statuscode']);assert.equal($6.getAttributeValueOptionSet('statuscode').value,3,'Opportunity closed');}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_($2.logicalName,new SparkleXrm.Sdk.Guid($2.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));}}
SparkleXrm.UnitTests.ActionTests.AddToQueue=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Entity('letter');$0.setAttributeValue('subject','Test');$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).value;var $1=new SparkleXrm.Sdk.Entity('queue');$1.setAttributeValue('name','Test');$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;try{var $2=new SparkleXrm.Sdk.Messages.AddToQueueRequest();$2.DestinationQueueId=new SparkleXrm.Sdk.Guid($1.id);$2.Target=$0.toEntityReference();SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('AddToQueue',SparkleXrm.Sdk.Messages.AddToQueueResponse);var $3=SparkleXrm.Sdk.OrganizationServiceProxy.execute($2);assert.ok($3.queueItemId!=null,'Queue item returned');}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));}}
SparkleXrm.UnitTests.AttributeTypeTests=function(){}
SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_01=function(assert){assert.expect(4);var $0='Unit Test'+Date.get_now().toISOString();var $1=new SparkleXrm.Sdk.Entity('account');$1.setAttributeValue('name',$0);$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;var $2=new SparkleXrm.Sdk.Entity('contact');SparkleXrm.Sdk.WebApiOrganizationServiceProxy.addNavigationPropertyMetadata('contact','parentcustomerid','account,contact');$2.setAttributeValue('lastname',$0);$2.setAttributeValue('parentcustomerid',$1.toEntityReference());$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).toString();var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($2.logicalName,$2.id,['parentcustomerid']);assert.equal($2.getAttributeValueEntityReference('parentcustomerid').id.value,$3.getAttributeValueEntityReference('parentcustomerid').id.value,'Account Contact related: ID correct');assert.equal($2.getAttributeValueEntityReference('parentcustomerid').logicalName,$3.getAttributeValueEntityReference('parentcustomerid').logicalName,'Account Contact related: Logical Name correct');$2.setAttributeValue('parentcustomerid',null);$2.setAttributeValue('contactid',new SparkleXrm.Sdk.Guid($2.id));SparkleXrm.Sdk.OrganizationServiceProxy.update($2);var $4=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($2.logicalName,$2.id,['parentcustomerid']);assert.ok($4.getAttributeValueEntityReference('parentcustomerid')==null,'Nulled lookup on update');var $5=new SparkleXrm.Sdk.Entity('contact');$5.setAttributeValue('lastname',$0);$5.setAttributeValue('parentcustomerid',null);$5.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($5).value;var $6=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($5.logicalName,$5.id,['parentcustomerid']);assert.ok($6.getAttributeValueEntityReference('parentcustomerid')==null,'Nulled lookup on create');SparkleXrm.Sdk.OrganizationServiceProxy.delete_($2.logicalName,new SparkleXrm.Sdk.Guid($2.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($5.logicalName,new SparkleXrm.Sdk.Guid($5.id));}
SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_02_SetPrimarContactToNull=function(assert){assert.expect(2);var $0='Unit Test'+Date.get_now().toISOString();var $1=new SparkleXrm.Sdk.Entity('account');$1.setAttributeValue('name',$0);$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;var $2=new SparkleXrm.Sdk.Entity('contact');SparkleXrm.Sdk.WebApiOrganizationServiceProxy.addNavigationPropertyMetadata('contact','parentcustomerid','account,contact');SparkleXrm.Sdk.WebApiOrganizationServiceProxy.addNavigationPropertyMetadata('account','primarycontactid','contact');$2.setAttributeValue('lastname',$0);$2.setAttributeValue('parentcustomerid',$1.toEntityReference());$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).toString();$1.setAttributeValue('primarycontactid',$2.toEntityReference());$1.setAttributeValue('accountid',new SparkleXrm.Sdk.Guid($1.id));SparkleXrm.Sdk.OrganizationServiceProxy.update($1);var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($1.logicalName,$1.id,['primarycontactid']);assert.equal($3.getAttributeValueEntityReference('primarycontactid').id.value,$2.id,'Primary Contact Set');$1.setAttributeValue('primarycontactid',null);SparkleXrm.Sdk.OrganizationServiceProxy.update($1);var $4=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($1.logicalName,$1.id,['primarycontactid']);assert.equal($4.getAttributeValueEntityReference('primarycontactid'),null,'Primary Contact Set to null');SparkleXrm.Sdk.OrganizationServiceProxy.delete_($2.logicalName,new SparkleXrm.Sdk.Guid($2.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));}
SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_03_CustomerId=function(assert){assert.expect(2);var $0='Unit Test'+Date.get_now().toISOString();var $1=new SparkleXrm.Sdk.Entity('account');$1.setAttributeValue('name',$0);$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;var $2=new SparkleXrm.Sdk.Entity('opportunity');$2.setAttributeValue('customerid',$1.toEntityReference());$2.setAttributeValue('name',$0);try{SparkleXrm.Sdk.WebApiOrganizationServiceProxy.addNavigationPropertyMetadata('opportunity','customerid','account,contact');$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).value;var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($2.logicalName,$2.id,['customerid']);assert.equal($3.getAttributeValueEntityReference('customerid').logicalName,$1.logicalName,'Logical Name correct');assert.equal($3.getAttributeValueEntityReference('customerid').id.value,$1.id,'Id correct : '+$1.id);}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_($2.logicalName,new SparkleXrm.Sdk.Guid($2.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));}}
SparkleXrm.UnitTests.AttributeTypeTests.Money_01=function(assert){assert.expect(2);var $0='Unit Test'+Date.get_now().toISOString();var $1=new SparkleXrm.Sdk.Entity('account');$1.setAttributeValue('name',$0);var $2=new SparkleXrm.Sdk.Money(123456);$1.setAttributeValue('creditlimit',$2);$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($1.logicalName,$1.id,['creditlimit','transactioncurrencyid']);assert.equal(($3.getAttributeValue('creditlimit')).value,$2.value,'Money value correct');var $4=$3.getAttributeValueEntityReference('transactioncurrencyid');assert.ok($4!=null&&$4.logicalName==='transactioncurrency','Transaction Currency = '+$4.name);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));}
SparkleXrm.UnitTests.CRUDTests=function(){}
SparkleXrm.UnitTests.CRUDTests.Create_01=function(assert){var $0=assert.async();var $1=new SparkleXrm.Sdk.Entity('contact');$1.setAttributeValue('lastname','Test '+Date.get_now().toISOString());SparkleXrm.Sdk.OrganizationServiceProxy.beginCreate($1,function($p1_0){
$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.endCreate($p1_0).toString();assert.ok($1.id,'New ID = '+$1.id);$0();SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));});}
SparkleXrm.UnitTests.CRUDTests.Create_01_Sync=function(assert){var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();assert.ok($0.id,'New ID = '+$0.id);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));}
SparkleXrm.UnitTests.CRUDTests.Update_01=function(assert){assert.expect(2);var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();$0.setAttributeValue('contactid',new SparkleXrm.Sdk.Guid($0.id));assert.ok($0.id,'New ID = '+$0.id);$0.setAttributeValue('lastname','Update');SparkleXrm.Sdk.OrganizationServiceProxy.update($0);var $1=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($0.logicalName,$0.id,['lastname']);assert.equal($1.getAttributeValue('lastname'),$0.getAttributeValue('lastname'),'Contact update');SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));}
SparkleXrm.UnitTests.CRUDTests.Update_02_UnknownEntity=function(assert){}
SparkleXrm.UnitTests.CRUDTests.Update_03_UnknownAttribute=function(assert){}
SparkleXrm.UnitTests.CRUDTests.Retrieve_01=function(assert){}
SparkleXrm.UnitTests.CRUDTests.Retrieve_02_UnknownLogicalName=function(assert){assert.expect(1);try{var $0=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('unknown_logicalname','00000000-0000-0000-0000-000000000001',['lastname']);}catch($1){assert.ok($1.message.indexOf('unknown_logicalname')>-1,'Exception thrown:'+$1.message);}}
SparkleXrm.UnitTests.CRUDTests.Retrieve_02_UnknownAttribute=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();try{var $1=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$0.id,['unknown_attribute']);}catch($2){assert.ok($2.message.indexOf('unknown_attribute')>-1,'Exception thrown:'+$2.message);}finally{}}
SparkleXrm.UnitTests.CRUDTests.Delete_01_Sync=function(assert){var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();assert.expect(1);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));try{var $1=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$0.id,['fullname']);assert.notOk(true,'Contact not detailed');}catch($2){assert.ok($2.message.indexOf($0.id)>-1,$2.message);}}
SparkleXrm.UnitTests.CRUDTests.Delete_02_Async=function(assert){var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();var $1=assert.async();assert.expect(1);SparkleXrm.Sdk.OrganizationServiceProxy.beginDelete($0.logicalName,new SparkleXrm.Sdk.Guid($0.id),function($p1_0){
SparkleXrm.Sdk.OrganizationServiceProxy.endDelete($p1_0);try{var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$0.id,['fullname']);}catch($1_1){assert.ok($1_1.message.indexOf($0.id)>-1,$1_1.message);}$1();});}
SparkleXrm.UnitTests.CRUDTests.PerformanceTest=function(assert){assert.expect(1);var $0=Date.get_now();var $1=50;for(var $3=0;$3<$1;$3++){var $4=new SparkleXrm.Sdk.Entity('contact');$4.setAttributeValue('lastname','Test '+Date.get_now().toISOString());$4.setAttributeValue('firstname','Test '+Date.get_now().toISOString());$4.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($4).toString();var $5=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve($4.logicalName,$4.id,['lastname','firstname']);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($4.logicalName,new SparkleXrm.Sdk.Guid($4.id));}var $2=(Date.get_now()-$0)/$1;assert.ok($2<500,'Avg:'+$2.toString());}
SparkleXrm.UnitTests.CRUDTests.Asscoiate_01_Sync=function(assert){assert.expect(3);var $0=new SparkleXrm.Sdk.Entity('account');$0.setAttributeValue('name','Test '+Date.get_now().toISOString());var $1=new SparkleXrm.Sdk.Entity('lead');$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).value;$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).value;try{SparkleXrm.Sdk.OrganizationServiceProxy.associate($0.logicalName,new SparkleXrm.Sdk.Guid($0.id),new SparkleXrm.Sdk.Relationship('accountleads_association'),[$1.toEntityReference()]);var $2="<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>\r\n  <entity name='lead'>  \r\n    <attribute name='leadid' />\r\n    <order attribute='fullname' descending='false' />\r\n    <link-entity name='accountleads' from='leadid' to='leadid' visible='false' intersect='true'>\r\n      <link-entity name='account' from='accountid' to='accountid' alias='ag'>\r\n        <filter type='and'>\r\n          <condition attribute='accountid' operator='eq' value='{"+$0.id+"}' />\r\n        </filter>\r\n      </link-entity>\r\n    </link-entity>\r\n  </entity>\r\n</fetch>";var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieveMultiple($2);assert.equal($3.entities.get_count(),1,'1 lead returned');assert.equal($3.entities.get_item(0).getAttributeValueGuid('leadid'),$1.id,'Lead ID correct');SparkleXrm.Sdk.OrganizationServiceProxy.disassociate($0.logicalName,new SparkleXrm.Sdk.Guid($0.id),new SparkleXrm.Sdk.Relationship('accountleads_association'),[$1.toEntityReference()]);var $4=SparkleXrm.Sdk.OrganizationServiceProxy.retrieveMultiple($2);assert.equal($4.entities.get_count(),0,'0 leads returned');}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));}}
SparkleXrm.UnitTests.FetchXmlTests=function(){}
SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_01_Simple=function(assert){assert.expect(1);var $0=assert.async();SparkleXrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple("<fetch version='1.0' output-format='xml-platform' mapping='logical' count='2' distinct='false' returntotalrecordcount='true'>\r\n                          <entity name='account'>\r\n                            <attribute name='name' />\r\n                            <attribute name='primarycontactid' />\r\n                            <attribute name='telephone1' />\r\n                            <attribute name='accountid' />\r\n                            <order attribute='name' descending='false' />\r\n                          </entity>\r\n                        </fetch>",function($p1_0){
var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,SparkleXrm.Sdk.Entity);assert.ok($1_0.entities.get_count()>0,'Non zero return count');$0();});}
SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_02_InvalidXml=function(assert){assert.expect(1);var $0=assert.async();try{SparkleXrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple("<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\r\n                              <",function($p1_0){
try{var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,SparkleXrm.Sdk.Entity);}catch($1_1){assert.ok($1_1.message.indexOf('Invalid XML')>-1,$1_1.message);$0();}});}catch($1){assert.ok($1.message.indexOf('Invalid FetchXml')>-1,$1.message);$0();}}
SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_03_UnkownLogicalName=function(assert){var $0=assert.async();assert.expect(1);SparkleXrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple("<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\r\n                          <entity name='unknown_entity'>\r\n                            <attribute name='name' />\r\n                            <attribute name='primarycontactid' />\r\n                            <attribute name='telephone1' />\r\n                            <attribute name='accountid' />\r\n                            <order attribute='name' descending='false' />\r\n                          </entity>\r\n                        </fetch>",function($p1_0){
try{var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,SparkleXrm.Sdk.Entity);}catch($1_1){assert.ok($1_1.message.indexOf('unknown_entity')>-1,$1_1.message);}$0();});}
SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_04_VeryLongFetch=function(assert){assert.expect(1);var $0='<value>{00000000-0000-0000-0000-000000000000}</value>';var $1="<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\r\n                              <entity name='contact'>\r\n                                <attribute name='fullname' />\r\n                                <attribute name='telephone1' />\r\n                                <attribute name='contactid' />\r\n                                <order attribute='fullname' descending='false' />\r\n                                <filter type='and'>\r\n                                  <condition attribute='contactid' operator='in'>\r\n                                   {0}\r\n                                  </condition>\r\n                                </filter>\r\n                              </entity>\r\n                            </fetch>";var $2='';for(var $5=0;$5<400;$5++){$2+=$0;}var $3=String.format($1,$2);var $4=SparkleXrm.Sdk.OrganizationServiceProxy.retrieveMultiple($3);assert.ok(!$4.entities.get_count(),'No results - but not an error due to the larget fetch size!');}
SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_05_TotalRecordCount=function(assert){assert.expect(2);var $0=assert.async();SparkleXrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple("<fetch version='1.0' output-format='xml-platform' mapping='logical' count='1' distinct='false' returntotalrecordcount='true'>\r\n                          <entity name='account'>\r\n                            <attribute name='name' />\r\n                            <order attribute='name' descending='false' />\r\n                          </entity>\r\n                        </fetch>",function($p1_0){
var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,SparkleXrm.Sdk.Entity);assert.ok($1_0.entities.get_count()>0,'Non zero return count');assert.ok($1_0.totalRecordCount>0,'Total Record count returned');$0();});}
FormContextTests=function(){}
FormContextTests.contactFormOnLoad=function(){FormContextTests.issue143_CreateFromDate();}
FormContextTests.issue143_CreateFromDate=function(){var $0=window.parent.Xrm.Page.data.entity;var $1='lastonholdtime';var $2=$0.attributes.get($1);var $3=$2.getValue();var $4=new SparkleXrm.Sdk.Entity('contact');$4.setAttributeValue($1,new Date($3.getFullYear(),$3.getMonth(),$3.getDate(),$3.getHours(),$3.getMinutes(),$3.getSeconds(),$3.getMilliseconds()));$4.setAttributeValue('lastname','TEST');SparkleXrm.Sdk.OrganizationServiceProxy.beginCreate($4,function($p1_0){
var $1_0=SparkleXrm.Sdk.OrganizationServiceProxy.endCreate($p1_0);});}
SparkleXrm.UnitTests.FunctionTests=function(){}
SparkleXrm.UnitTests.FunctionTests.WhoAmI=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Messages.WhoAmIRequest();SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('WhoAmI',SparkleXrm.Sdk.Messages.WhoAmIResponse);var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);assert.ok($1.userId!=null,'Userid='+$1.userId.value);}
SparkleXrm.UnitTests.FunctionTests.RetrieveDuplicates_01_NoExistingContact=function(assert){assert.expect(2);var $0=new SparkleXrm.Sdk.Entity('contact');$0.setAttributeValue('firstname','Foo');$0.setAttributeValue('lastname','Bar');$0.setAttributeValue('emailaddress1','foo@bar.com');$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).value;try{var $1=new Xrm.Sdk.Messages.RetrieveDuplicatesRequest();$1.matchingEntityName='contact';$1.pagingInfo=new SparkleXrm.Sdk.Messages.PagingInfo();$1.pagingInfo.PageNumber=1;$1.pagingInfo.Count=10;$1.pagingInfo.ReturnTotalRecordCount=true;var $2=new SparkleXrm.Sdk.Entity('contact');$2.setAttributeValue('firstname','Foo');$2.setAttributeValue('lastname','Bar');$2.setAttributeValue('emailaddress1','foo@bar.com');$1.businessEntity=$2;SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('RetrieveDuplicates',Xrm.Sdk.Messages.RetrieveDuplicatesResponse);var $3=SparkleXrm.Sdk.OrganizationServiceProxy.execute($1);assert.ok($3.duplicateCollection!=null&&$3.duplicateCollection.entities!=null,'Duplicates returned');assert.equal($3.duplicateCollection.entities.get_count(),1,'Duplicate detected');}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_('contact',new SparkleXrm.Sdk.Guid($0.id));}}
SparkleXrm.UnitTests.FunctionTests.RetrieveDuplicates_02_ExistingContact=function(assert){assert.expect(2);var $0=null;var $1=null;try{var $2=new SparkleXrm.Sdk.Entity('contact');$2.setAttributeValue('firstname','Foo');$2.setAttributeValue('lastname','Bar');$2.setAttributeValue('emailaddress1','foo@bar.com');$0=SparkleXrm.Sdk.OrganizationServiceProxy.create($2);$1=SparkleXrm.Sdk.OrganizationServiceProxy.create($2);$2.id=$0.value;var $3=new Xrm.Sdk.Messages.RetrieveDuplicatesRequest();$3.matchingEntityName='contact';$3.pagingInfo=new SparkleXrm.Sdk.Messages.PagingInfo();$3.pagingInfo.PageNumber=1;$3.pagingInfo.Count=10;$3.pagingInfo.ReturnTotalRecordCount=true;$3.businessEntity=$2;SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('RetrieveDuplicates',Xrm.Sdk.Messages.RetrieveDuplicatesResponse);var $4=SparkleXrm.Sdk.OrganizationServiceProxy.execute($3);assert.ok($4.duplicateCollection.entities.get_count()>0,'Expected >0 record returned');var $5=$4.duplicateCollection.entities.get_item(0).id;var $6=($4.duplicateCollection.entities.get_count()>1)?$4.duplicateCollection.entities.get_item(1).id:null;assert.ok($5===$1.value||$6===$1.value,'ID of second contact returned');}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_('contact',$0);SparkleXrm.Sdk.OrganizationServiceProxy.delete_('contact',$1);}}
SparkleXrm.UnitTests.FunctionTests.RetrieveUserPrivileges_01=function(assert){assert.expect(3);var $0=new SparkleXrm.Sdk.Messages.WhoAmIRequest();SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('WhoAmI',SparkleXrm.Sdk.Messages.WhoAmIResponse);var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);var $2=new SparkleXrm.Sdk.Messages.RetrieveUserPrivilegesRequest();$2.userId=$1.userId;SparkleXrm.Sdk.OrganizationServiceProxy.registerExecuteMessageResponseType('RetrieveUserPrivileges',SparkleXrm.Sdk.Messages.RetrieveUserPrivilegesResponse);var $3=SparkleXrm.Sdk.OrganizationServiceProxy.execute($2);assert.ok($3.rolePrivileges.length>0,'Privileges returned');var $4=$3.rolePrivileges[0].Depth;assert.ok($4==='Basic'||$4==='Deep'||$4==='Global'||$4==='Local','Privileges Depth returned');assert.ok($3.rolePrivileges[0].PrivilegeId!=null&&$3.rolePrivileges[0].PrivilegeId.value!=null,'Privileges Id returned');}
SparkleXrm.UnitTests.LocalisationTests=function(){}
SparkleXrm.UnitTests.LocalisationTests.NumberParse=function(assert){assert.expect(2);var $0={};$0.decimalSymbol=',';$0.numberSepartor='.';var $1=SparkleXrm.NumberEx.parse('22,10',$0);assert.equal($1,22.1,'numbers equal after format');var $2=SparkleXrm.NumberEx.parse('1.022,10',$0);assert.equal($2,1022.1,'numbers equal after format');}
SparkleXrm.UnitTests.LocalisationTests.LocalTimeZoneTests=function(assert){assert.expect(1);var $0='lastonholdtime';var $1=new Date();var $2=new SparkleXrm.Sdk.Entity('contact');$2.setAttributeValue($0,$1);$2.setAttributeValue('lastname','TEST');$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).toString();var $3=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$2.id,[$0]);var $4=$3.getAttributeValue($0);assert.equal($4.toUTCString(),$1.toUTCString(),String.format('dates equal {0} {1}',$4.toString(),$1.toString()));SparkleXrm.Sdk.OrganizationServiceProxy.delete_('contact',new SparkleXrm.Sdk.Guid($3.id));}
SparkleXrm.UnitTests.LocalisationTests.UTCTimeZoneTests=function(assert){assert.expect(1);var $0='lastonholdtime';var $1=new Date();var $2=new Date();$2.setUTCFullYear($1.getUTCFullYear());$2.setUTCMonth($1.getUTCMonth());$2.setUTCDate($1.getUTCDate());$2.setUTCHours($1.getUTCHours());$2.setUTCMinutes($1.getUTCMinutes());$2.setUTCSeconds($1.getUTCSeconds());$2.setUTCMilliseconds($1.getUTCMilliseconds());var $3=new SparkleXrm.Sdk.Entity('contact');$3.setAttributeValue($0,$2);$3.setAttributeValue('lastname','TEST');$3.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($3).toString();var $4=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$3.id,[$0]);var $5=$4.getAttributeValue($0);assert.equal($5.toUTCString(),$2.toUTCString(),String.format('dates equal {0} {1}',$5.toString(),$2.toString()));SparkleXrm.Sdk.OrganizationServiceProxy.delete_('contact',new SparkleXrm.Sdk.Guid($4.id));}
SparkleXrm.UnitTests.MetadataQueryTests=function(){}
SparkleXrm.UnitTests.MetadataQueryTests.entityMetadataQuery_EntityOnly=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Messages.RetrieveEntityRequest();$0.entityFilters=SparkleXrm.Sdk.Messages.EntityFilters.entity;$0.logicalName='account';$0.metadataId=SparkleXrm.Sdk.Guid.empty;var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);assert.equal($1.entityMetadata.LogicalName,'account','Metadata returned');}
SparkleXrm.UnitTests.MetadataQueryTests.entityMetadataQuery_EntityAndAttributes=function(assert){assert.expect(2);var $0=new SparkleXrm.Sdk.Messages.RetrieveEntityRequest();$0.entityFilters=SparkleXrm.Sdk.Messages.EntityFilters.entity|SparkleXrm.Sdk.Messages.EntityFilters.attributes;$0.logicalName='account';$0.metadataId=SparkleXrm.Sdk.Guid.empty;var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);assert.equal($1.entityMetadata.LogicalName,'account','Metadata returned');assert.ok($1.entityMetadata.Attributes.length>10,'Attributes returned');}
SparkleXrm.UnitTests.MetadataQueryTests.attributeMetadataQuery_Picklist=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Messages.RetrieveAttributeRequest();$0.entityLogicalName='account';$0.logicalName='address1_shippingmethodcode';$0.retrieveAsIfPublished=true;var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);assert.ok(($1.attributeMetadata).OptionSet.Options.length>0,'Optionsets returned');}
SparkleXrm.UnitTests.MetadataQueryTests.queryAllMetaData=function(assert){assert.expect(2);var $0=new SparkleXrm.Sdk.Messages.RetrieveMetadataChangesRequest();$0.query={};$0.query.criteria={};$0.query.criteria.filterOperator='Or';$0.query.criteria.conditions=[];var $1={};$1.conditionOperator='Equals';$1.propertyName='LogicalName';$1.value='account';$0.query.criteria.conditions.add($1);$0.query.properties={};$0.query.properties.propertyNames=['Attributes'];var $2={};$2.properties={};$2.properties.propertyNames=['OptionSet'];$0.query.attributeQuery=$2;var $3={};$2.criteria=$3;$3.filterOperator='And';$3.conditions=[];var $4=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);debugger;assert.ok($4.entityMetadata[0].Attributes.length>0,'attributes returned');var $enum1=ss.IEnumerator.getEnumerator($4.entityMetadata[0].Attributes);while($enum1.moveNext()){var $5=$enum1.current;if($5.LogicalName==='address1_addresstypecode'){var $6=$5;assert.equal($6.OptionSet.Options[0].Label.LocalizedLabels[0].Label,'Bill To','Optionset label');break;}}}
SparkleXrm.UnitTests.MetadataQueryTests.queryNameAttributeForAccount=function(assert){var $0=new SparkleXrm.Sdk.Metadata.Query.MetadataQueryBuilder();$0.addEntities(['account'],['PrimaryNameAttribute']);var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0.request);assert.equal($1.entityMetadata[0].PrimaryNameAttribute,'name','Name equal');}
SparkleXrm.UnitTests.MetadataQueryTests.queryAttributeDisplayNamesForTwoEntities=function(assert){assert.expect(1);var $0=new SparkleXrm.Sdk.Metadata.Query.MetadataQueryBuilder();$0.addEntities(['account','contact'],['Attributes','DisplayName','DisplayCollectionName']);$0.addAttributes(['name','firstname','statecode','statuscode'],['DisplayName']);var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0.request);assert.equal($1.entityMetadata.length,2,'Metadata Count');}
SparkleXrm.UnitTests.MetadataQueryTests.queryOneToManyRelationship=function(assert){var $0=new SparkleXrm.Sdk.RetrieveRelationshipRequest();$0.name='contact_customer_accounts';$0.retrieveAsIfPublished=true;var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);var $2=$1.relationshipMetadata;assert.equal($2.IsCustomRelationship,false,'IsCustomRelationship');assert.equal($2.SchemaName,'contact_customer_accounts','Schemaname');assert.equal($2.ReferencedAttribute,'accountid','ReferencedAttribute');}
SparkleXrm.UnitTests.MetadataQueryTests.queryManyToManyRelationship=function(assert){var $0=new SparkleXrm.Sdk.RetrieveRelationshipRequest();$0.name='accountleads_association';$0.retrieveAsIfPublished=true;var $1=SparkleXrm.Sdk.OrganizationServiceProxy.execute($0);var $2=$1.relationshipMetadata;assert.equal($2.IsCustomRelationship,false,'IsCustomRelationship');assert.equal($2.SchemaName,'accountleads_association','Schemaname');assert.equal($2.IntersectEntityName,'accountleads','InteresectEntityName');}
SparkleXrm.UnitTests.ActivityTests=function(){}
SparkleXrm.UnitTests.ActivityTests.activity_01=function(assert){assert.expect(1);var $0=Date.get_now().toISOString()+Date.get_now().toTimeString();var $1=new SparkleXrm.Sdk.Entity('contact');$1.setAttributeValue('lastname','Test Contact1 ');$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($1).toString();var $2=new SparkleXrm.Sdk.Entity('contact');$2.setAttributeValue('lastname','Test Contact2 ');$2.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($2).toString();var $3=new SparkleXrm.Sdk.Entity('activityparty');$3.setAttributeValue('partyid',$1.toEntityReference());var $4=[];SparkleXrm.ArrayEx.add($4,$3);var $5=new SparkleXrm.Sdk.Entity('email');$5.setAttributeValue('to',new SparkleXrm.Sdk.EntityCollection($4));$5.setAttributeValue('subject','Unit Test email '+$0);$5.setAttributeValue('id',SparkleXrm.Sdk.OrganizationServiceProxy.create($5));$5.id=$5.getAttributeValue('id').toString();var $6=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('email',$5.id,['to','subject']);var $7=$6.getAttributeValue('to');assert.equal($7.entities.get_count(),1,'Recipient Count');var $8=new SparkleXrm.Sdk.Entity('activityparty');$8.setAttributeValue('partyid',$2.toEntityReference());var $9=$7.entities.items();SparkleXrm.ArrayEx.add($9,$8);SparkleXrm.Sdk.OrganizationServiceProxy.update($6);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($5.logicalName,new SparkleXrm.Sdk.Guid($5.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));SparkleXrm.Sdk.OrganizationServiceProxy.delete_($2.logicalName,new SparkleXrm.Sdk.Guid($2.id));}
SparkleXrm.UnitTests.ActivityTests.prototype={issue143_DateRetrieve:function(assert){assert.expect(2);var $0=new SparkleXrm.Sdk.Entity('contact');var $1=new SparkleXrm.Sdk.Entity('contact');try{$0.setAttributeValue('lastname','Test Contact1 ');$0.id=SparkleXrm.Sdk.OrganizationServiceProxy.create($0).toString();var $2=SparkleXrm.Sdk.OrganizationServiceProxy.retrieve('contact',$0.id,['createdon','modifiedon']);var $3=$2.getAttributeValue('createdon');assert.equal(Date.get_now().getFullYear(),$3.getFullYear(),'Year must be the same');$1=new SparkleXrm.Sdk.Entity('contact');$1.setAttributeValue('birthdate',$3);var $4=assert.async();SparkleXrm.Sdk.OrganizationServiceProxy.beginCreate($1,function($p1_0){
$1.id=SparkleXrm.Sdk.OrganizationServiceProxy.endCreate($p1_0).value;assert.ok($1.id!=null,'ID returned 2 '+$1.id);SparkleXrm.Sdk.OrganizationServiceProxy.delete_($1.logicalName,new SparkleXrm.Sdk.Guid($1.id));$4();});}finally{SparkleXrm.Sdk.OrganizationServiceProxy.delete_($0.logicalName,new SparkleXrm.Sdk.Guid($0.id));}return true;}}
SparkleXrm.UnitTests.PromiseTests=function(){}
SparkleXrm.UnitTests.PromiseTests.Test_Create=function(assert){assert.expect(1);var $0=assert.async();var $1=new SparkleXrm.Sdk.Entity('contact');$1.setAttributeValue('lastname','Test '+Date.get_now().toISOString());SparkleXrm.Sdk.XrmService.create($1).then(function($p1_0){
$1.id=$p1_0.value;assert.ok(true,$1.id);$0();}).catch(function($p1_0){
$0();});}
SparkleXrm.UnitTests.ActionTests.registerClass('SparkleXrm.UnitTests.ActionTests');SparkleXrm.UnitTests.AttributeTypeTests.registerClass('SparkleXrm.UnitTests.AttributeTypeTests');SparkleXrm.UnitTests.CRUDTests.registerClass('SparkleXrm.UnitTests.CRUDTests');SparkleXrm.UnitTests.FetchXmlTests.registerClass('SparkleXrm.UnitTests.FetchXmlTests');FormContextTests.registerClass('FormContextTests');SparkleXrm.UnitTests.FunctionTests.registerClass('SparkleXrm.UnitTests.FunctionTests');SparkleXrm.UnitTests.LocalisationTests.registerClass('SparkleXrm.UnitTests.LocalisationTests');SparkleXrm.UnitTests.MetadataQueryTests.registerClass('SparkleXrm.UnitTests.MetadataQueryTests');SparkleXrm.UnitTests.ActivityTests.registerClass('SparkleXrm.UnitTests.ActivityTests');SparkleXrm.UnitTests.PromiseTests.registerClass('SparkleXrm.UnitTests.PromiseTests');(function(){QUnit.module('Action Tests',null);QUnit.test('ActionTests.WinOpportunity',SparkleXrm.UnitTests.ActionTests.WinOpportunity);QUnit.test('ActionTests.AddToQueue',SparkleXrm.UnitTests.ActionTests.AddToQueue);})();
(function(){QUnit.module('AttributeTypeTests',null);QUnit.test('AttributeTypeTests.EntityReference_01',SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_01);QUnit.test('AttributeTypeTests.EntityReference_02_SetPrimarContactToNull',SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_02_SetPrimarContactToNull);QUnit.test('AttributeTypeTests.EntityReference_03_CustomerId',SparkleXrm.UnitTests.AttributeTypeTests.EntityReference_03_CustomerId);QUnit.test('AttributeTypeTests.Money_01',SparkleXrm.UnitTests.AttributeTypeTests.Money_01);})();
(function(){QUnit.module('CRUD Tests',null);QUnit.test('CRUDTests.Create_01',SparkleXrm.UnitTests.CRUDTests.Create_01);QUnit.test('CRUDTests.Create_01_Sync',SparkleXrm.UnitTests.CRUDTests.Create_01_Sync);QUnit.test('CRUDTests.Update_01',SparkleXrm.UnitTests.CRUDTests.Update_01);QUnit.test('CRUDTests.Delete_01_Sync',SparkleXrm.UnitTests.CRUDTests.Delete_01_Sync);QUnit.test('CRUDTests.Retrieve_02_UnknownLogicalName',SparkleXrm.UnitTests.CRUDTests.Retrieve_02_UnknownLogicalName);QUnit.test('CRUDTests.Retrieve_02_UnknownAttribute',SparkleXrm.UnitTests.CRUDTests.Retrieve_02_UnknownAttribute);QUnit.test('CRUDTests.Asscoiate_01_Sync',SparkleXrm.UnitTests.CRUDTests.Asscoiate_01_Sync);})();
(function(){QUnit.module('FetchXmlTests',null);QUnit.test('FetchXmlTests.RetreiveMultiple_01_Simple',SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_01_Simple);QUnit.test('FetchXmlTests.RetreiveMultiple_02_InvalidXml',SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_02_InvalidXml);QUnit.test('FetchXmlTests.RetreiveMultiple_03_UnkownLogicalName',SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_03_UnkownLogicalName);QUnit.test('FetchXmlTests.RetreiveMultiple_04_VeryLongFetch',SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_04_VeryLongFetch);QUnit.test('FetchXmlTests.RetreiveMultiple_05_TotalRecordCount',SparkleXrm.UnitTests.FetchXmlTests.RetreiveMultiple_05_TotalRecordCount);})();
(function(){QUnit.module('FunctionTests',null);QUnit.test('FunctionTests.WhoAmI',SparkleXrm.UnitTests.FunctionTests.WhoAmI);QUnit.test('FunctionTests.RetrieveDuplicates_01_NoExistingContact',SparkleXrm.UnitTests.FunctionTests.RetrieveDuplicates_01_NoExistingContact);QUnit.test('FunctionTests.RetrieveDuplicates_02_ExistingContact',SparkleXrm.UnitTests.FunctionTests.RetrieveDuplicates_02_ExistingContact);QUnit.test('FunctionTests.RetrieveUserPrivileges_01',SparkleXrm.UnitTests.FunctionTests.RetrieveUserPrivileges_01);})();
(function(){QUnit.module('LocalisationTests',null);QUnit.test('NumberParse',SparkleXrm.UnitTests.LocalisationTests.NumberParse);QUnit.test('LocalTimeZoneTests',SparkleXrm.UnitTests.LocalisationTests.LocalTimeZoneTests);QUnit.test('UTCTimeZoneTests',SparkleXrm.UnitTests.LocalisationTests.UTCTimeZoneTests);})();
(function(){QUnit.module('MetadataQueryTests',null);QUnit.test('EntityMetadataQuery_EntityOnly',SparkleXrm.UnitTests.MetadataQueryTests.entityMetadataQuery_EntityOnly);QUnit.test('EntityMetadataQuery_EntityAndAttributes',SparkleXrm.UnitTests.MetadataQueryTests.entityMetadataQuery_EntityAndAttributes);QUnit.test('AttributeMetadataQuery_Picklist',SparkleXrm.UnitTests.MetadataQueryTests.attributeMetadataQuery_Picklist);QUnit.test('QueryAllMetaData',SparkleXrm.UnitTests.MetadataQueryTests.queryAllMetaData);QUnit.test('QueryAttributeDisplayNamesForTwoEntities',SparkleXrm.UnitTests.MetadataQueryTests.queryAttributeDisplayNamesForTwoEntities);QUnit.test('QueryNameAttributeForAccount',SparkleXrm.UnitTests.MetadataQueryTests.queryNameAttributeForAccount);QUnit.test('QueryManyToManyRelationship',SparkleXrm.UnitTests.MetadataQueryTests.queryManyToManyRelationship);QUnit.test('QueryOneToManyRelationship',SparkleXrm.UnitTests.MetadataQueryTests.queryOneToManyRelationship);})();
(function(){QUnit.module('ActivityTests',null);QUnit.test('Activity_01',SparkleXrm.UnitTests.ActivityTests.activity_01);})();
(function(){QUnit.module('PromiseTests',null);QUnit.test('PromiseTests.Test_Create',SparkleXrm.UnitTests.PromiseTests.Test_Create);})();
})();// This script was generated using Script# v0.7.4.0
