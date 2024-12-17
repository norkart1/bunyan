import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  activities?: Maybe<Array<AccountActivity>>;
  balance?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expenses?: Maybe<Array<Expense>>;
  id: Scalars['Int']['output'];
  incomes?: Maybe<Array<Income>>;
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AccountActivity = {
  __typename?: 'AccountActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Account>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export enum ActionEnum {
  AddRemarks = 'ADD_REMARKS',
  Claim = 'CLAIM',
  Create = 'CREATE',
  Delete = 'DELETE',
  Reject = 'REJECT',
  Update = 'UPDATE',
  Verify = 'VERIFY'
}

export type ActivityLog = {
  __typename?: 'ActivityLog';
  action: ActionEnum;
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  targetId?: Maybe<Scalars['Int']['output']>;
  targetType?: Maybe<Scalars['String']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Credential>;
};

export type Badge = {
  __typename?: 'Badge';
  activities?: Maybe<Array<BadgeActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  year?: Maybe<Year>;
  yearId?: Maybe<Scalars['Int']['output']>;
};

export type BadgeActivity = {
  __typename?: 'BadgeActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Badge>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Campaign = {
  __typename?: 'Campaign';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<CampaignActivity>>;
  badge?: Maybe<Badge>;
  badgeId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  tasks?: Maybe<Array<Task>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  year?: Maybe<Year>;
  yearId?: Maybe<Scalars['Int']['output']>;
};

export type CampaignActivity = {
  __typename?: 'CampaignActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Campaign>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expenses?: Maybe<Array<Expense>>;
  id: Scalars['Int']['output'];
  incomes?: Maybe<Array<Income>>;
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<CategoryTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CategoryTypeEnum {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type Charity = {
  __typename?: 'Charity';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<CharityActivity>>;
  admin?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  donations?: Maybe<Array<Donation>>;
  expirationDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  startingDate?: Maybe<Scalars['DateTime']['output']>;
  target?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type CharityActivity = {
  __typename?: 'CharityActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Charity>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Committee = {
  __typename?: 'Committee';
  activities?: Maybe<Array<CommitteeActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommitteeActivity = {
  __typename?: 'CommitteeActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Committee>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type CreateAccountInput = {
  balance?: Scalars['Float']['input'];
  mahalluId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateBadgeInput = {
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
  yearId: Scalars['Int']['input'];
};

export type CreateCampaignInput = {
  active?: Scalars['Boolean']['input'];
  badgeId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
  yearId: Scalars['Int']['input'];
};

export type CreateCategoryInput = {
  mahalluId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: CategoryTypeEnum;
};

export type CreateCharityInput = {
  active?: Scalars['Boolean']['input'];
  admin?: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  expirationDate: Scalars['DateTime']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  posterUrl: Scalars['String']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  startingDate: Scalars['DateTime']['input'];
  target: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  verified?: Scalars['Boolean']['input'];
};

export type CreateCommitteeInput = {
  mahalluId: Scalars['Int']['input'];
  memberId: Scalars['Int']['input'];
  position: Scalars['String']['input'];
};

export type CreateCredentialInput = {
  districtId?: InputMaybe<Scalars['Int']['input']>;
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  role: RoleEnum;
  username: Scalars['String']['input'];
  villageId?: InputMaybe<Scalars['Int']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateDistrictInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateDonationInput = {
  amount: Scalars['Int']['input'];
  charityId: Scalars['Int']['input'];
  contact: Scalars['String']['input'];
  donatedAt: Scalars['DateTime']['input'];
  guest: Scalars['Boolean']['input'];
  mahalluId: Scalars['Int']['input'];
  memberId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  status: DonationStatusEnum;
};

export type CreateEventInput = {
  active?: Scalars['Boolean']['input'];
  admin?: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  endingDate: Scalars['DateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  online?: Scalars['Boolean']['input'];
  posterURL: Scalars['String']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  startingDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  verified?: Scalars['Boolean']['input'];
};

export type CreateExpenseInput = {
  accountId: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  categoryId: Scalars['Int']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  mahalluId: Scalars['Int']['input'];
  paidBy: Scalars['String']['input'];
};

export type CreateFamilyInput = {
  block: Scalars['String']['input'];
  houseHolder: Scalars['String']['input'];
  houseName: Scalars['String']['input'];
  houseNumber: Scalars['String']['input'];
  houseType: HouseTypeEnum;
  mahalluId: Scalars['Int']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
  panchayathMunicipality: Scalars['String']['input'];
  panchayathWardNo: Scalars['String']['input'];
  place: Scalars['String']['input'];
  rationCardType: RationCardTypeEnum;
  wardHouseNo: Scalars['String']['input'];
  whatsapp: Scalars['String']['input'];
};

export type CreateFatwaInput = {
  /** The question asked by the user */
  question: Scalars['String']['input'];
  /** The mobile number of the questioner */
  questionerMobile: Scalars['String']['input'];
  /** The current status of the fatwa */
  status?: FatwaStatus;
};

export type CreateIncomeInput = {
  accountId: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  categoryId: Scalars['Int']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  mahalluId: Scalars['Int']['input'];
  receivedBy: Scalars['String']['input'];
};

export type CreateJobInput = {
  active?: Scalars['Boolean']['input'];
  admin?: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  employmentType: EmploymentTypeEnum;
  expirationDate: Scalars['DateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  locationType: LocationTypeEnum;
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  postedDate?: Scalars['DateTime']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  salaryRange: Scalars['String']['input'];
  skills: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  verified?: Scalars['Boolean']['input'];
};

export type CreateMahalluInput = {
  contact: Scalars['String']['input'];
  createdById?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pinCode: Scalars['String']['input'];
  place: Scalars['String']['input'];
  postOffice: Scalars['String']['input'];
  regNo: Scalars['String']['input'];
  totalPoints?: InputMaybe<Scalars['Float']['input']>;
  username: Scalars['String']['input'];
  villageId: Scalars['Int']['input'];
};

export type CreateMemberInput = {
  abroad?: InputMaybe<Scalars['Boolean']['input']>;
  abroadPlace?: InputMaybe<Scalars['String']['input']>;
  bloodGroup?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  familyId?: InputMaybe<Scalars['Int']['input']>;
  gender: GenderEnum;
  generalQualification?: InputMaybe<Scalars['String']['input']>;
  healthCondition?: InputMaybe<Scalars['String']['input']>;
  islamicQualification?: InputMaybe<Scalars['String']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  jobSector?: InputMaybe<Scalars['String']['input']>;
  maritalStatus?: InputMaybe<MarriageStatusEnum>;
  name: Scalars['String']['input'];
  orphan?: InputMaybe<Scalars['Boolean']['input']>;
  relationToHouseHolder?: InputMaybe<Scalars['String']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  yearOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateNotificationInput = {
  active?: Scalars['Boolean']['input'];
  content: Scalars['String']['input'];
  credentials?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateOtherProgramInput = {
  categoryId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  files: Array<Scalars['String']['input']>;
  mahalluId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostInput = {
  active?: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  fileURL: Scalars['String']['input'];
  mahalluId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostInteractionInput = {
  guest: Scalars['Boolean']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
};

export type CreateTaskCategoryInput = {
  active?: Scalars['Boolean']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateTaskInput = {
  active?: Scalars['Boolean']['input'];
  badgeId?: InputMaybe<Scalars['Int']['input']>;
  campaignId?: InputMaybe<Scalars['Int']['input']>;
  categoryId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  dueDate: Scalars['DateTime']['input'];
  points: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  yearId: Scalars['Int']['input'];
};

export type CreateTaskParticipantInput = {
  description: Scalars['String']['input'];
  files: Array<Scalars['String']['input']>;
  mahalluId: Scalars['Int']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateVillageInput = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  zoneId: Scalars['Int']['input'];
};

export type CreateYearInput = {
  name: Scalars['String']['input'];
  type: YearTypeEnum;
};

export type CreateZoneInput = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  districtId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Credential = {
  __typename?: 'Credential';
  accountActivities?: Maybe<Array<AccountActivity>>;
  badgeActivities?: Maybe<Array<BadgeActivity>>;
  campaignActivities?: Maybe<Array<CampaignActivity>>;
  charityActivities?: Maybe<Array<CharityActivity>>;
  committeeActivities?: Maybe<Array<CommitteeActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  district?: Maybe<District>;
  districtActivities?: Maybe<Array<DistrictActivity>>;
  districtId?: Maybe<Scalars['Int']['output']>;
  donationActivities?: Maybe<Array<DonationActivity>>;
  eventActivities?: Maybe<Array<EventActivity>>;
  familyActivities?: Maybe<Array<FamilyActivity>>;
  id: Scalars['Int']['output'];
  jobActivities?: Maybe<Array<JobActivity>>;
  mahallu?: Maybe<Mahallu>;
  mahalluActivities?: Maybe<Array<MahalluActivity>>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  memberActivities?: Maybe<Array<MemberActivity>>;
  notificationActivities?: Maybe<Array<NotificationActivity>>;
  otherProgramActivities?: Maybe<Array<OtherProgramActivity>>;
  password?: Maybe<Scalars['String']['output']>;
  postActivities?: Maybe<Array<PostActivity>>;
  role?: Maybe<RoleEnum>;
  taskActivities?: Maybe<Array<TaskActivity>>;
  taskCategoryActivities?: Maybe<Array<TaskCategoryActivity>>;
  taskParticipantActivities?: Maybe<Array<TaskParticipantActivity>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  village?: Maybe<Village>;
  villageActivities?: Maybe<Array<VillageActivity>>;
  villageId?: Maybe<Scalars['Int']['output']>;
  yearActivities?: Maybe<Array<YearActivity>>;
  zone?: Maybe<Zone>;
  zoneActivities?: Maybe<Array<ZoneActivity>>;
  zoneId?: Maybe<Scalars['Int']['output']>;
};

export type District = {
  __typename?: 'District';
  activities?: Maybe<Array<DistrictActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credential?: Maybe<Credential>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  zones?: Maybe<Array<Zone>>;
};

export type DistrictActivity = {
  __typename?: 'DistrictActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<District>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Donation = {
  __typename?: 'Donation';
  activities?: Maybe<Array<DonationActivity>>;
  amount?: Maybe<Scalars['Int']['output']>;
  charity?: Maybe<Charity>;
  charityId?: Maybe<Scalars['Int']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  donatedAt?: Maybe<Scalars['DateTime']['output']>;
  guest?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<DonationStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DonationActivity = {
  __typename?: 'DonationActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Donation>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export enum DonationStatusEnum {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export enum EmploymentTypeEnum {
  Contract = 'CONTRACT',
  FullTime = 'FULL_TIME',
  Intern = 'INTERN',
  PartTime = 'PART_TIME',
  Temporary = 'TEMPORARY'
}

export type Event = {
  __typename?: 'Event';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<EventActivity>>;
  admin?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endingDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['String']['output']>;
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  online?: Maybe<Scalars['Boolean']['output']>;
  posterURL?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  startingDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type EventActivity = {
  __typename?: 'EventActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Event>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Expense = {
  __typename?: 'Expense';
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  paidBy?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Family = {
  __typename?: 'Family';
  activities?: Maybe<Array<FamilyActivity>>;
  block?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  houseHolder?: Maybe<Scalars['String']['output']>;
  houseName?: Maybe<Scalars['String']['output']>;
  houseNumber?: Maybe<Scalars['String']['output']>;
  houseType?: Maybe<HouseTypeEnum>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  members?: Maybe<Array<Member>>;
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  panchayathMunicipality?: Maybe<Scalars['String']['output']>;
  panchayathWardNo?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  rationCardType?: Maybe<RationCardTypeEnum>;
  regNo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wardHouseNo?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
};

export type FamilyActivity = {
  __typename?: 'FamilyActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Family>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Fatwa = {
  __typename?: 'Fatwa';
  /** The answer provided for the question */
  answer?: Maybe<Scalars['String']['output']>;
  /** The timestamp when the question was answered */
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  /** Details of the scholar who answered the question */
  answeredBy?: Maybe<Credential>;
  /** ID of the scholar who answered the question */
  answeredById?: Maybe<Scalars['Int']['output']>;
  /** The timestamp when the question was asked */
  askedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The timestamp when the fatwa record was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for the fatwa */
  id?: Maybe<Scalars['Int']['output']>;
  /** The question asked by the user */
  question?: Maybe<Scalars['String']['output']>;
  /** The mobile number of the questioner */
  questionerMobile?: Maybe<Scalars['String']['output']>;
  /** The current status of the fatwa */
  status: FatwaStatus;
};

/** The status of the fatwa (Pending, Answered, Rejected) */
export enum FatwaStatus {
  Answered = 'ANSWERED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Feed item union type */
export type FeedItem = {
  __typename?: 'FeedItem';
  event?: Maybe<Event>;
  job?: Maybe<Job>;
  post?: Maybe<Post>;
};

export enum GenderEnum {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export enum HouseTypeEnum {
  Own = 'OWN',
  Rent = 'RENT'
}

export type Income = {
  __typename?: 'Income';
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  receivedBy?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Job = {
  __typename?: 'Job';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<JobActivity>>;
  admin?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  employmentType?: Maybe<EmploymentTypeEnum>;
  expirationDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['String']['output']>;
  locationType?: Maybe<LocationTypeEnum>;
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  postedDate: Scalars['DateTime']['output'];
  remarks?: Maybe<Scalars['String']['output']>;
  salaryRange?: Maybe<Scalars['String']['output']>;
  skills: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type JobActivity = {
  __typename?: 'JobActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Job>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export enum LocationTypeEnum {
  Hybrid = 'HYBRID',
  Onsite = 'ONSITE',
  Remote = 'REMOTE'
}

export type Mahallu = {
  __typename?: 'Mahallu';
  accounts?: Maybe<Array<Account>>;
  activities?: Maybe<Array<MahalluActivity>>;
  badges?: Maybe<Array<Badge>>;
  categories?: Maybe<Array<Category>>;
  charities?: Maybe<Array<Charity>>;
  committees?: Maybe<Array<Committee>>;
  contact?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credential?: Maybe<Credential>;
  donations?: Maybe<Array<Donation>>;
  events?: Maybe<Array<Event>>;
  expenses?: Maybe<Array<Expense>>;
  families?: Maybe<Array<Family>>;
  id: Scalars['Int']['output'];
  incomes?: Maybe<Array<Income>>;
  jobs?: Maybe<Array<Job>>;
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  otherPrograms?: Maybe<Array<OtherProgram>>;
  pinCode?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  postInteractions?: Maybe<Array<PostInteraction>>;
  postOffice?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  regNo?: Maybe<Scalars['String']['output']>;
  taskParticipants?: Maybe<Array<TaskParticipant>>;
  totalPoints?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  village?: Maybe<Village>;
  villageId?: Maybe<Scalars['Int']['output']>;
};

export type MahalluActivity = {
  __typename?: 'MahalluActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Mahallu>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type MahalluActivityCounts = {
  __typename?: 'MahalluActivityCounts';
  events: Scalars['Int']['output'];
  jobs: Scalars['Int']['output'];
  otherPrograms: Scalars['Int']['output'];
  posts: Scalars['Int']['output'];
  taskParticipants: Scalars['Int']['output'];
};

export type MahalluLeaderboardEntry = {
  __typename?: 'MahalluLeaderboardEntry';
  badges: Array<Badge>;
  badgesCount: Scalars['Int']['output'];
  counts: MahalluActivityCounts;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  place: Scalars['String']['output'];
  regNo: Scalars['String']['output'];
  totalPoints: Scalars['Int']['output'];
};

export type MahalluRankingDetails = {
  __typename?: 'MahalluRankingDetails';
  districtRanking?: Maybe<RankingDetails>;
  overallRanking: RankingDetails;
  villageRanking?: Maybe<RankingDetails>;
  zoneRanking?: Maybe<RankingDetails>;
};

export enum MarriageStatusEnum {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Separated = 'SEPARATED',
  Unmarried = 'UNMARRIED',
  Widowed = 'WIDOWED'
}

export type Member = {
  __typename?: 'Member';
  abroad?: Maybe<Scalars['Boolean']['output']>;
  abroadPlace?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<MemberActivity>>;
  bloodGroup?: Maybe<Scalars['String']['output']>;
  committee?: Maybe<Committee>;
  contact?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  donations?: Maybe<Array<Donation>>;
  family?: Maybe<Family>;
  familyId?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<GenderEnum>;
  generalQualification?: Maybe<Scalars['String']['output']>;
  healthCondition?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  islamicQualification?: Maybe<Scalars['String']['output']>;
  job?: Maybe<Scalars['String']['output']>;
  jobSector?: Maybe<Scalars['String']['output']>;
  maritalStatus?: Maybe<MarriageStatusEnum>;
  name?: Maybe<Scalars['String']['output']>;
  orphan?: Maybe<Scalars['Boolean']['output']>;
  regNo?: Maybe<Scalars['String']['output']>;
  relationToHouseHolder?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  yearOfBirth?: Maybe<Scalars['DateTime']['output']>;
};

export type MemberActivity = {
  __typename?: 'MemberActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Member>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activeOrInactiveCharity: Charity;
  activeOrInactiveEvent: Event;
  activeOrInactiveJob: Job;
  activeOrInactivePost: Post;
  activeOrInactiveTask: Task;
  addRemarks: Job;
  answerFatwa: Fatwa;
  changePassword: Scalars['Boolean']['output'];
  claimOtherProgram: OtherProgram;
  claimTaskParticipant: TaskParticipant;
  createAccount: Account;
  createBadge: Badge;
  createCampaign: Campaign;
  createCategory: Category;
  createCharity: Charity;
  createCommittee: Committee;
  createCredential: Credential;
  createDistrict: District;
  createDonation: Donation;
  createEvent: Event;
  createExpense: Expense;
  createFamily: Family;
  createFatwa: Fatwa;
  createIncome: Income;
  createJob: Job;
  createMahallu: Mahallu;
  createManyDistricts: Array<District>;
  createManyEvents: Array<Event>;
  createManyFamilys: Array<Family>;
  createManyIncomes: Array<Income>;
  createManyJobs: Array<Job>;
  createManyMahallus: Array<Mahallu>;
  createManyMembers: Array<Member>;
  createManyNotifications: Array<Notification>;
  createManyOtherPrograms: Array<OtherProgram>;
  createManyPosts: Array<Post>;
  createManyTaskCategorys: Array<TaskCategory>;
  createManyTaskParticipants: Array<TaskParticipant>;
  createManyTasks: Array<Task>;
  createManyVillages: Array<Village>;
  createManyYears: Array<Year>;
  createManyZones: Array<Zone>;
  createMember: Member;
  createNotification: Notification;
  createOtherProgram: OtherProgram;
  createPost: Post;
  createPostInteraction: PostInteraction;
  createTask: Task;
  createTaskCategory: TaskCategory;
  createTaskParticipant: TaskParticipant;
  createVillage: Village;
  createYear: Year;
  createZone: Zone;
  findMemberByPhone: Member;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  rejectJob: Job;
  removeAccount: Account;
  removeAccounts: Array<Account>;
  removeBadge: Badge;
  removeBadges: Array<Badge>;
  removeCampaign: Campaign;
  removeCampaigns: Array<Campaign>;
  removeCategories: Array<Category>;
  removeCategory: Category;
  removeCharities: Array<Charity>;
  removeCharity: Charity;
  removeCommittee: Committee;
  removeCommittees: Array<Committee>;
  removeCredential: Credential;
  removeCredentials: Array<Credential>;
  removeDistrict: District;
  removeDistricts: Array<District>;
  removeDonation: Donation;
  removeDonations: Array<Donation>;
  removeEvent: Event;
  removeEvents: Array<Event>;
  removeExpense: Expense;
  removeExpenses: Array<Expense>;
  removeFamilies: Array<Family>;
  removeFamily: Family;
  removeFatwa: Fatwa;
  removeIncome: Income;
  removeIncomes: Array<Income>;
  removeJob: Job;
  removeJobs: Array<Job>;
  removeMahallu: Mahallu;
  removeMahallus: Array<Mahallu>;
  removeMember: Member;
  removeMembers: Array<Member>;
  removeNotification: Notification;
  removeNotifications: Array<Notification>;
  removeOtherProgram: OtherProgram;
  removePost: Post;
  removePostInteraction: PostInteraction;
  removePosts: Array<Post>;
  removeTask: Task;
  removeTaskCategories: Array<TaskCategory>;
  removeTaskCategory: TaskCategory;
  removeTaskParticipant: TaskParticipant;
  removeTaskParticipants: Array<TaskParticipant>;
  removeTasks: Array<Task>;
  removeVillage: Village;
  removeVillages: Array<Village>;
  removeYear: Year;
  removeYears: Array<Year>;
  removeZone: Zone;
  removeZones: Array<Zone>;
  updateAccount: Account;
  updateBadge: Badge;
  updateCampaign: Campaign;
  updateCategory: Category;
  updateCharity: Charity;
  updateCommittee: Committee;
  updateCredential: Credential;
  updateDistrict: District;
  updateDonation: Donation;
  updateEvent: Event;
  updateExpense: Expense;
  updateFamily: Family;
  updateFatwa: Fatwa;
  updateIncome: Income;
  updateJob: Job;
  updateMahallu: Mahallu;
  updateMember: Member;
  updateNotification: Notification;
  updateOtherProgram: OtherProgram;
  updatePost: Post;
  updatePostInteraction: PostInteraction;
  updateTask: Task;
  updateTaskCategory: TaskCategory;
  updateTaskParticipant: TaskParticipant;
  updateViewedBy: Notification;
  updateVillage: Village;
  updateYear: Year;
  updateZone: Zone;
  verifyDistrict: District;
  verifyFamily: Family;
  verifyJob: Job;
  verifyMahallu: Mahallu;
  verifyMember: Member;
  verifyOtherProgram: OtherProgram;
  verifyTaskParticipant: TaskParticipant;
};


export type MutationActiveOrInactiveCharityArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationActiveOrInactiveEventArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationActiveOrInactiveJobArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationActiveOrInactivePostArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationActiveOrInactiveTaskArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationAddRemarksArgs = {
  value: Scalars['String']['input'];
};


export type MutationAnswerFatwaArgs = {
  answer: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationClaimOtherProgramArgs = {
  id: Scalars['Int']['input'];
};


export type MutationClaimTaskParticipantArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCreateAccountArgs = {
  createAccountInput: CreateAccountInput;
};


export type MutationCreateBadgeArgs = {
  createBadgeInput: CreateBadgeInput;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateCharityArgs = {
  createCharityInput: CreateCharityInput;
};


export type MutationCreateCommitteeArgs = {
  createCommitteeInput: CreateCommitteeInput;
};


export type MutationCreateCredentialArgs = {
  createCredentialInput: CreateCredentialInput;
};


export type MutationCreateDistrictArgs = {
  createDistrictInput: CreateDistrictInput;
};


export type MutationCreateDonationArgs = {
  createDonationInput: CreateDonationInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};


export type MutationCreateExpenseArgs = {
  createExpenseInput: CreateExpenseInput;
};


export type MutationCreateFamilyArgs = {
  createFamilyInput: CreateFamilyInput;
};


export type MutationCreateFatwaArgs = {
  createFatwaInput: CreateFatwaInput;
};


export type MutationCreateIncomeArgs = {
  createIncomeInput: CreateIncomeInput;
};


export type MutationCreateJobArgs = {
  createJobInput: CreateJobInput;
};


export type MutationCreateMahalluArgs = {
  createMahalluInput: CreateMahalluInput;
};


export type MutationCreateManyDistrictsArgs = {
  createManyDistrictInput: Array<CreateDistrictInput>;
};


export type MutationCreateManyEventsArgs = {
  createManyEventInput: Array<CreateEventInput>;
};


export type MutationCreateManyFamilysArgs = {
  createManyFamilyInput: Array<CreateFamilyInput>;
};


export type MutationCreateManyIncomesArgs = {
  createManyIncomeInput: Array<CreateIncomeInput>;
};


export type MutationCreateManyJobsArgs = {
  createManyJobInput: Array<CreateJobInput>;
};


export type MutationCreateManyMahallusArgs = {
  createManyMahalluInput: Array<CreateMahalluInput>;
};


export type MutationCreateManyMembersArgs = {
  createManyMemberInput: Array<CreateMemberInput>;
};


export type MutationCreateManyNotificationsArgs = {
  createManyNotificationInput: Array<CreateNotificationInput>;
};


export type MutationCreateManyOtherProgramsArgs = {
  createManyOtherProgramInput: Array<CreateOtherProgramInput>;
};


export type MutationCreateManyPostsArgs = {
  createManyPostInput: Array<CreatePostInput>;
};


export type MutationCreateManyTaskCategorysArgs = {
  createManyTaskCategoryInput: Array<CreateTaskCategoryInput>;
};


export type MutationCreateManyTaskParticipantsArgs = {
  createManyTaskParticipantInput: Array<CreateTaskParticipantInput>;
};


export type MutationCreateManyTasksArgs = {
  createManyTaskInput: Array<CreateTaskInput>;
};


export type MutationCreateManyVillagesArgs = {
  createManyVillageInput: Array<CreateVillageInput>;
};


export type MutationCreateManyYearsArgs = {
  createManyYearInput: Array<CreateYearInput>;
};


export type MutationCreateManyZonesArgs = {
  createManyZoneInput: Array<CreateZoneInput>;
};


export type MutationCreateMemberArgs = {
  createMemberInput: CreateMemberInput;
};


export type MutationCreateNotificationArgs = {
  createNotificationInput: CreateNotificationInput;
};


export type MutationCreateOtherProgramArgs = {
  createOtherProgramInput: CreateOtherProgramInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreatePostInteractionArgs = {
  createPostInteractionInput: CreatePostInteractionInput;
};


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationCreateTaskCategoryArgs = {
  createTaskCategoryInput: CreateTaskCategoryInput;
};


export type MutationCreateTaskParticipantArgs = {
  createTaskParticipantInput: CreateTaskParticipantInput;
};


export type MutationCreateVillageArgs = {
  createVillageInput: CreateVillageInput;
};


export type MutationCreateYearArgs = {
  createYearInput: CreateYearInput;
};


export type MutationCreateZoneArgs = {
  createZoneInput: CreateZoneInput;
};


export type MutationFindMemberByPhoneArgs = {
  phone: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRejectJobArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationRemoveAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAccountsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveBadgeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBadgesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCampaignArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCampaignsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCategoriesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCharitiesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCharityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommitteeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommitteesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCredentialArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCredentialsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveDistrictArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveDistrictsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveDonationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveDonationsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEventsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveExpenseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveExpensesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveFamiliesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveFamilyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveFatwaArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveIncomeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveIncomesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveJobArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveJobsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveMahalluArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveMahallusArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveMemberArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveMembersArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveNotificationsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveOtherProgramArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePostInteractionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePostsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTaskCategoriesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveTaskCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTaskParticipantArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTaskParticipantsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveTasksArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveVillageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVillagesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveYearArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveYearsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRemoveZoneArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveZonesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationUpdateAccountArgs = {
  updateAccountInput: UpdateAccountInput;
};


export type MutationUpdateBadgeArgs = {
  updateBadgeInput: UpdateBadgeInput;
};


export type MutationUpdateCampaignArgs = {
  updateCampaignInput: UpdateCampaignInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateCharityArgs = {
  updateCharityInput: UpdateCharityInput;
};


export type MutationUpdateCommitteeArgs = {
  updateCommitteeInput: UpdateCommitteeInput;
};


export type MutationUpdateCredentialArgs = {
  updateCredentialInput: UpdateCredentialInput;
};


export type MutationUpdateDistrictArgs = {
  updateDistrictInput: UpdateDistrictInput;
};


export type MutationUpdateDonationArgs = {
  updateDonationInput: UpdateDonationInput;
};


export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
};


export type MutationUpdateExpenseArgs = {
  updateExpenseInput: UpdateExpenseInput;
};


export type MutationUpdateFamilyArgs = {
  updateFamilyInput: UpdateFamilyInput;
};


export type MutationUpdateFatwaArgs = {
  updateFatwaInput: UpdateFatwaInput;
};


export type MutationUpdateIncomeArgs = {
  updateIncomeInput: UpdateIncomeInput;
};


export type MutationUpdateJobArgs = {
  updateJobInput: UpdateJobInput;
};


export type MutationUpdateMahalluArgs = {
  updateMahalluInput: UpdateMahalluInput;
};


export type MutationUpdateMemberArgs = {
  updateMemberInput: UpdateMemberInput;
};


export type MutationUpdateNotificationArgs = {
  updateNotificationInput: UpdateNotificationInput;
};


export type MutationUpdateOtherProgramArgs = {
  updateOtherProgramInput: UpdateOtherProgramInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdatePostInteractionArgs = {
  updatePostInteractionInput: UpdatePostInteractionInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateTaskCategoryArgs = {
  updateTaskCategoryInput: UpdateTaskCategoryInput;
};


export type MutationUpdateTaskParticipantArgs = {
  updateTaskParticipantInput: UpdateTaskParticipantInput;
};


export type MutationUpdateViewedByArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateVillageArgs = {
  updateVillageInput: UpdateVillageInput;
};


export type MutationUpdateYearArgs = {
  updateYearInput: UpdateYearInput;
};


export type MutationUpdateZoneArgs = {
  updateZoneInput: UpdateZoneInput;
};


export type MutationVerifyDistrictArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationVerifyFamilyArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationVerifyJobArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationVerifyMahalluArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationVerifyMemberArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationVerifyOtherProgramArgs = {
  id: Scalars['Int']['input'];
  points: Scalars['Int']['input'];
};


export type MutationVerifyTaskParticipantArgs = {
  id: Scalars['Int']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<NotificationActivity>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Credential>;
  createdById?: Maybe<Scalars['Int']['output']>;
  credentials?: Maybe<Array<Credential>>;
  id: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  viewedBy?: Maybe<Scalars['JSON']['output']>;
};

export type NotificationActivity = {
  __typename?: 'NotificationActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Notification>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type OtherProgram = {
  __typename?: 'OtherProgram';
  activities?: Maybe<Array<OtherProgramActivity>>;
  category?: Maybe<TaskCategory>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  claimed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type OtherProgramActivity = {
  __typename?: 'OtherProgramActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<OtherProgram>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Post = {
  __typename?: 'Post';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<PostActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fileURL?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  interactions?: Maybe<Array<PostInteraction>>;
  likes?: Maybe<Scalars['Int']['output']>;
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostActivity = {
  __typename?: 'PostActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Post>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type PostInteraction = {
  __typename?: 'PostInteraction';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  guest?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  accountActivities: Array<AccountActivity>;
  accounts: Array<Account>;
  badge: Badge;
  badgeActivities: Array<BadgeActivity>;
  badges: Array<Badge>;
  campaign: Campaign;
  campaignActivities: Array<CampaignActivity>;
  campaigns: Array<Campaign>;
  categories: Array<Category>;
  category: Category;
  charities: Array<Charity>;
  charity: Charity;
  charityActivities: Array<CharityActivity>;
  checkLoggedIn: AuthResponse;
  committee: Committee;
  committeeActivities: Array<CommitteeActivity>;
  committees: Array<Committee>;
  countAccount: Scalars['Int']['output'];
  countBadge: Scalars['Int']['output'];
  countCampaign: Scalars['Int']['output'];
  countCategory: Scalars['Int']['output'];
  countCharity: Scalars['Int']['output'];
  countCommittee: Scalars['Int']['output'];
  countCredential: Scalars['Int']['output'];
  countDistrict: Scalars['Int']['output'];
  countDonation: Scalars['Int']['output'];
  countEvent: Scalars['Int']['output'];
  countExpense: Scalars['Int']['output'];
  countFamily: Scalars['Int']['output'];
  countFatwas: Scalars['Int']['output'];
  countIncome: Scalars['Int']['output'];
  countJob: Scalars['Int']['output'];
  countMahallu: Scalars['Int']['output'];
  countMember: Scalars['Int']['output'];
  countNotification: Scalars['Int']['output'];
  countPost: Scalars['Int']['output'];
  countTask: Scalars['Int']['output'];
  countTaskCategory: Scalars['Int']['output'];
  countTaskParticipant: Scalars['Int']['output'];
  countVillage: Scalars['Int']['output'];
  countYear: Scalars['Int']['output'];
  countZone: Scalars['Int']['output'];
  credential: Credential;
  credentials: Array<Credential>;
  district: District;
  districtActivities: Array<DistrictActivity>;
  districts: Array<District>;
  donation: Donation;
  donationActivities: Array<DonationActivity>;
  donations: Array<Donation>;
  event: Event;
  eventActivities: Array<EventActivity>;
  events: Array<Event>;
  expense: Expense;
  expenses: Array<Expense>;
  families: Array<Family>;
  family: Family;
  familyActivities: Array<FamilyActivity>;
  fatwa: Fatwa;
  fatwas: Array<Fatwa>;
  getActorActivityLog: Array<ActivityLog>;
  getFromOtherProgramsOnMyVillage: Array<OtherProgram>;
  getFromTaskParticipationOnMyVillage: Array<TaskParticipant>;
  getLeaderboard: Array<MahalluLeaderboardEntry>;
  getMahalluRanking: MahalluRankingDetails;
  getPersonalizedFeed: Array<FeedItem>;
  income: Income;
  incomes: Array<Income>;
  job: Job;
  jobActivities: Array<JobActivity>;
  jobs: Array<Job>;
  mahallu: Mahallu;
  mahalluActivities: Array<MahalluActivity>;
  mahallus: Array<Mahallu>;
  member: Member;
  memberActivities: Array<MemberActivity>;
  members: Array<Member>;
  myNotifications: Array<Notification>;
  mySentNotifications: Array<Notification>;
  notification: Notification;
  notificationActivities: Array<NotificationActivity>;
  notifications: Array<Notification>;
  otherProgram: OtherProgram;
  otherProgramActivities: Array<OtherProgramActivity>;
  otherPrograms: Array<OtherProgram>;
  post: Post;
  postActivities: Array<PostActivity>;
  postInteraction: PostInteraction;
  postInteractions: Array<PostInteraction>;
  posts: Array<Post>;
  task: Task;
  taskActivities: Array<TaskActivity>;
  taskCategories: Array<TaskCategory>;
  taskCategory: TaskCategory;
  taskCategoryActivities: Array<TaskCategoryActivity>;
  taskParticipant: TaskParticipant;
  taskParticipantActivities: Array<TaskParticipantActivity>;
  taskParticipants: Array<TaskParticipant>;
  tasks: Array<Task>;
  village: Village;
  villageActivities: Array<VillageActivity>;
  villages: Array<Village>;
  year: Year;
  yearActivities: Array<YearActivity>;
  years: Array<Year>;
  zone: Zone;
  zoneActivities: Array<ZoneActivity>;
  zones: Array<Zone>;
};


export type QueryAccountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAccountActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryAccountsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryBadgeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBadgeActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryBadgesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCampaignArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCampaignActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryCampaignsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCharitiesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCharityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCharityActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryCommitteeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommitteeActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryCommitteesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountAccountArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountBadgeArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountCampaignArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountCategoryArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountCharityArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountCommitteeArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountCredentialArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountDistrictArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountDonationArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountEventArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountExpenseArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountFamilyArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountFatwasArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountIncomeArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountJobArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountMahalluArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountMemberArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountNotificationArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountPostArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountTaskArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountTaskCategoryArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountTaskParticipantArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountVillageArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountYearArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCountZoneArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryCredentialArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCredentialsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryDistrictArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDistrictActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryDistrictsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryDonationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDonationActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryDonationsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryEventsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryExpenseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryExpensesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryFamiliesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryFamilyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFamilyActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryFatwaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFatwasArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetActorActivityLogArgs = {
  actorId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetFromOtherProgramsOnMyVillageArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
  relationsToInclude?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetFromTaskParticipationOnMyVillageArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
  relationsToInclude?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetLeaderboardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMahalluRankingArgs = {
  mahalluId: Scalars['Int']['input'];
};


export type QueryGetPersonalizedFeedArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  recentlyViewed: RecentlyViewedInput;
};


export type QueryIncomeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryIncomesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryJobArgs = {
  id: Scalars['Int']['input'];
};


export type QueryJobActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryJobsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryMahalluArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMahalluActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryMahallusArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryMemberArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMemberActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryMembersArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryMyNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMySentNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNotificationActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryNotificationsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryOtherProgramArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOtherProgramActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryOtherProgramsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryPostInteractionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostInteractionsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryPostsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryTaskCategoriesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryTaskCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskCategoryActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryTaskParticipantArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskParticipantActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryTaskParticipantsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryTasksArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryVillageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVillageActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryVillagesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryYearArgs = {
  id: Scalars['Int']['input'];
};


export type QueryYearActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryYearsArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryZoneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryZoneActivitiesArgs = {
  filters: Scalars['JSON']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy: Scalars['JSON']['input'];
  relationsToFilter: Scalars['JSON']['input'];
};


export type QueryZonesArgs = {
  filters?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  relationsToFilter?: InputMaybe<Scalars['JSON']['input']>;
};

export type RankingDetails = {
  __typename?: 'RankingDetails';
  entityId: Scalars['Int']['output'];
  entityName: Scalars['String']['output'];
  percentile: Scalars['Float']['output'];
  rank: Scalars['Int']['output'];
  totalEntities: Scalars['Int']['output'];
};

export enum RationCardTypeEnum {
  Apl = 'APL',
  Bpl = 'BPL'
}

export type RecentlyViewedInput = {
  eventIds?: Array<Scalars['Int']['input']>;
  jobIds?: Array<Scalars['Int']['input']>;
  postIds?: Array<Scalars['Int']['input']>;
};

export enum RoleEnum {
  DistrictAdmin = 'DISTRICT_ADMIN',
  InfoAdmin = 'INFO_ADMIN',
  MahalluAdmin = 'MAHALLU_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER',
  VillageAdmin = 'VILLAGE_ADMIN',
  ZoneAdmin = 'ZONE_ADMIN'
}

export type Task = {
  __typename?: 'Task';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<TaskActivity>>;
  badge?: Maybe<Badge>;
  badgeId?: Maybe<Scalars['Int']['output']>;
  campaign?: Maybe<Campaign>;
  campaignId?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<TaskCategory>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  participants?: Maybe<Array<TaskParticipant>>;
  points?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  year?: Maybe<Year>;
  yearId?: Maybe<Scalars['Int']['output']>;
};

export type TaskActivity = {
  __typename?: 'TaskActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Task>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type TaskCategory = {
  __typename?: 'TaskCategory';
  active?: Maybe<Scalars['Boolean']['output']>;
  activities?: Maybe<Array<TaskCategoryActivity>>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  otherPrograms?: Maybe<Array<OtherProgram>>;
  tasks?: Maybe<Array<Task>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskCategoryActivity = {
  __typename?: 'TaskCategoryActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<TaskCategory>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type TaskParticipant = {
  __typename?: 'TaskParticipant';
  activities?: Maybe<Array<TaskParticipantActivity>>;
  claimed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  files: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mahallu?: Maybe<Mahallu>;
  mahalluId?: Maybe<Scalars['Int']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type TaskParticipantActivity = {
  __typename?: 'TaskParticipantActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<TaskParticipant>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type UpdateAccountInput = {
  balance?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBadgeInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  yearId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCampaignInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  badgeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  yearId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryTypeEnum>;
};

export type UpdateCharityInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  startingDate?: InputMaybe<Scalars['DateTime']['input']>;
  target?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCommitteeInput = {
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  memberId?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCredentialInput = {
  districtId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
  username?: InputMaybe<Scalars['String']['input']>;
  villageId?: InputMaybe<Scalars['Int']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateDistrictInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDonationInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  charityId?: InputMaybe<Scalars['Int']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  donatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  guest?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  memberId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DonationStatusEnum>;
};

export type UpdateEventInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endingDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  online?: InputMaybe<Scalars['Boolean']['input']>;
  posterURL?: InputMaybe<Scalars['String']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  startingDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateExpenseInput = {
  accountId?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  paidBy?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFamilyInput = {
  block?: InputMaybe<Scalars['String']['input']>;
  houseHolder?: InputMaybe<Scalars['String']['input']>;
  houseName?: InputMaybe<Scalars['String']['input']>;
  houseNumber?: InputMaybe<Scalars['String']['input']>;
  houseType?: InputMaybe<HouseTypeEnum>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  panchayathMunicipality?: InputMaybe<Scalars['String']['input']>;
  panchayathWardNo?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  rationCardType?: InputMaybe<RationCardTypeEnum>;
  wardHouseNo?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFatwaInput = {
  id: Scalars['Int']['input'];
  /** The question asked by the user */
  question?: InputMaybe<Scalars['String']['input']>;
  /** The mobile number of the questioner */
  questionerMobile?: InputMaybe<Scalars['String']['input']>;
  /** The current status of the fatwa */
  status?: InputMaybe<FatwaStatus>;
};

export type UpdateIncomeInput = {
  accountId?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  receivedBy?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<EmploymentTypeEnum>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  locationType?: InputMaybe<LocationTypeEnum>;
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  postedDate?: InputMaybe<Scalars['DateTime']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  salaryRange?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMahalluInput = {
  contact?: InputMaybe<Scalars['String']['input']>;
  createdById?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  pinCode?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  postOffice?: InputMaybe<Scalars['String']['input']>;
  regNo?: InputMaybe<Scalars['String']['input']>;
  totalPoints?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  villageId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMemberInput = {
  abroad?: InputMaybe<Scalars['Boolean']['input']>;
  abroadPlace?: InputMaybe<Scalars['String']['input']>;
  bloodGroup?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  familyId?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<GenderEnum>;
  generalQualification?: InputMaybe<Scalars['String']['input']>;
  healthCondition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  islamicQualification?: InputMaybe<Scalars['String']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  jobSector?: InputMaybe<Scalars['String']['input']>;
  maritalStatus?: InputMaybe<MarriageStatusEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  orphan?: InputMaybe<Scalars['Boolean']['input']>;
  relationToHouseHolder?: InputMaybe<Scalars['String']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  yearOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateNotificationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  credentials?: InputMaybe<Array<Scalars['Int']['input']>>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOtherProgramInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileURL?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInteractionInput = {
  guest?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTaskCategoryInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  badgeId?: InputMaybe<Scalars['Int']['input']>;
  campaignId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  points?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  yearId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTaskParticipantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['Int']['input'];
  mahalluId?: InputMaybe<Scalars['Int']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVillageInput = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateYearInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<YearTypeEnum>;
};

export type UpdateZoneInput = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  districtId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Village = {
  __typename?: 'Village';
  activities?: Maybe<Array<VillageActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credential?: Maybe<Credential>;
  id: Scalars['Int']['output'];
  mahallus?: Maybe<Array<Mahallu>>;
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  zone?: Maybe<Zone>;
  zoneId?: Maybe<Scalars['Int']['output']>;
};

export type VillageActivity = {
  __typename?: 'VillageActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Village>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type Year = {
  __typename?: 'Year';
  activities?: Maybe<Array<YearActivity>>;
  badges?: Maybe<Array<Badge>>;
  campaigns?: Maybe<Array<Campaign>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Task>>;
  type?: Maybe<YearTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type YearActivity = {
  __typename?: 'YearActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Year>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export enum YearTypeEnum {
  All = 'ALL',
  Current = 'CURRENT',
  Past = 'PAST'
}

export type Zone = {
  __typename?: 'Zone';
  activities?: Maybe<Array<ZoneActivity>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credential?: Maybe<Credential>;
  district?: Maybe<District>;
  districtId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  villages?: Maybe<Array<Village>>;
};

export type ZoneActivity = {
  __typename?: 'ZoneActivity';
  action?: Maybe<ActionEnum>;
  actor?: Maybe<Credential>;
  actorId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  target?: Maybe<Zone>;
  targetId?: Maybe<Scalars['Int']['output']>;
};

export type FindAllDistrictsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindAllDistrictsQuery = { __typename?: 'Query', districts: Array<{ __typename?: 'District', id: number, name?: string | null }> };


export const FindAllDistrictsDocument = gql`
    query FindAllDistricts($limit: Int, $offset: Int) {
  districts(limit: $limit, offset: $offset) {
    id
    name
  }
}
    `;

/**
 * __useFindAllDistrictsQuery__
 *
 * To run a query within a React component, call `useFindAllDistrictsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllDistrictsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllDistrictsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllDistrictsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>(FindAllDistrictsDocument, options);
      }
export function useFindAllDistrictsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>(FindAllDistrictsDocument, options);
        }
export function useFindAllDistrictsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>(FindAllDistrictsDocument, options);
        }
export type FindAllDistrictsQueryHookResult = ReturnType<typeof useFindAllDistrictsQuery>;
export type FindAllDistrictsLazyQueryHookResult = ReturnType<typeof useFindAllDistrictsLazyQuery>;
export type FindAllDistrictsSuspenseQueryHookResult = ReturnType<typeof useFindAllDistrictsSuspenseQuery>;
export type FindAllDistrictsQueryResult = Apollo.QueryResult<FindAllDistrictsQuery, FindAllDistrictsQueryVariables>;