-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 06:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_podjinn`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `section`) VALUES
(1, 'Admin - Services', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, view_leadoverview, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, view_jinnprofile, manipulate_scrumboard'),
(2, 'Admin-HR', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, view_leadoverview, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, view_jinnprofile'),
(3, 'Admin-Accounts', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, view_leadoverview, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, view_jinnprofile'),
(4, 'Podjinn', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, view_clientinfo, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, view_jinnprofile, share_project, manipulate_scrumboard, submit_milestone, see_mytasks'),
(5, 'Jinn', 'add_comment , add_file_upoad , add_link , add_message , add-comment , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , communcation-center , proposal_list , project-task-list , star_rating-list, view_scrumboard, view_scrumboard, creator_profile, view_jinnprofile, add_task, edit_task, see_mytasks'),
(6, 'Client', 'add_comment , add_file_upoad , add_link , add_message , add_milestone , add-comment , allow_conferance , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , communcation-center , list-invoice , list-order , list-payment , order-payment , payment_history , payment-payout , project-list , project-task-list , rating-dashboard , rating-podjinn , report_analysis , report-analysis , star_rating-list, set_payment, single_payment, send_proposal, create_project, create_pipeline, view_subscription, publisher_profile, revoke_project, multiple_selection, accept_revision, view_scrumboard, change_podjinn, approve_milestone, invite_accountassociate'),
(7, 'Client Representative', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people, view_jinnprofile, approve_milestone'),
(8, 'KAM', 'add_comment , add_file_upoad , add_link , add_message , add_milestone , add-comment , allow_conferance , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , communcation-center , list-invoice , list-order , list-payment , order-payment , payment_history , payment-payout , project-list , project-task-list , rating-dashboard , rating-podjinn , report_analysis , report-analysis , star_rating-list, set_payment, single_payment, send_proposal, create_project, create_pipeline, view_subscription, publisher_profile, view_jinnprofile, approve_milestone'),
(9, 'SuperAdmin', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, send_proposal, view_jinnprofile, manipulate_scrumboard, submit_milestone, view_clientinfo'),
(10, 'Admin', 'add_comment , add_event , add_file_upoad , add_invoice , add_link , add_message , add_milestone , add_notebook , add_people , add_risk , add_task , add_task_list , approve_tasks , add-comment , adit-monitoring , all_member-list , allow_call , allow_conferance , allow_maxxstations , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , can_edit_package , can-review-timelog , client_user-list , client_user-show , communcation-center , create_client , create_project , create_proposal , create-employee , create-invoice , create-project , create-project-task , log_time , manage_client , manage_orders , package_create , pod_create , podjinn_list , jinn_list , portfolio-create , portfolio-delete , portfolio-edit , portfolio-list , portfolio-show , product_services , project_archieve , project_complete , project_reassign , project-list , proposal_list , project-task-list , publish_package , rating-client , rating-create , rating-dashboard , rating-jinns , rating-list , rating-pod , rating-project , remove_people , report_analysis , report-analysis , show-user , social_account-add , social_account-delete , social_account-edit , social_account-list , star_rating-list , view-permission-management , view-role-management , view-setting-management , view-user-management, set_payment, multiple_payment, enable_escrow, create_project, publish_project, revise_project, activate_project, view_scrumboard, creator_profile, manage_notification, edit_task, add_task, archive_project, multiple_selection, assign_people, send_forbid, send_foracceptance, view_jinnprofile, manipulate_scrumboard, submit_milestone, share_project, view_clientinfo'),
(11, 'CKAM', 'add_comment , add_file_upoad , add_link , add_message , add_milestone , add-comment , allow_conferance , allow_jinn_maxxstations , allow_message , allow_video_call , campaign-console , communcation-center , list-invoice , list-order , list-payment , order-payment , payment_history , payment-payout , project-list , project-task-list , rating-dashboard , rating-podjinn , report_analysis , report-analysis , star_rating-list, set_payment, single_payment, send_proposal, create_project, create_pipeline, view_subscription, publisher_profile, revoke_project, multiple_selection, accept_revision, view_scrumboard, change_podjinn, approve_milestone');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
