import * as Yup from 'yup';
import {
  additionalServiceRule,
  amountRule,
  includesRule,
  serviceCategoryRule,
  serviceDurationRule,
  serviceOverviewRule,
  serviceSlugRule,
  serviceSubCategoryRule,
  serviceTitleRule,
  staffRule,
  offerAmountRule,
} from './ValidationRules';

const serviceValidation = Yup.object().shape({
  serviceTitle: serviceTitleRule,
  slug: serviceSlugRule,
  categoryId: serviceCategoryRule,
  subCategoryId: serviceSubCategoryRule,
  duration: serviceDurationRule,
  amount: amountRule,
  serviceOverview: serviceOverviewRule,
  staff: staffRule,
  offerAmount: offerAmountRule,
  includes: includesRule,
});

export default serviceValidation;
