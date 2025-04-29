import ApiURLS from "../Data/ApiURLS";
import { useApiMutation } from "./apiRequest";

export const useProductMutations = () => {
  const discontinueProductsMutation = useApiMutation(
    ApiURLS.DiscontinueProducts.url,
    ApiURLS.DiscontinueProducts.method
  );

  const reContinueProductsMutation = useApiMutation(
    ApiURLS.RecontinueProducts.url,
    ApiURLS.RecontinueProducts.method
  );

  const handleDiscontinueProducts = async (id) => {
    await discontinueProductsMutation.mutateAsync({ Products: [id] });
  };

  const handleReContinueProducts = async (id) => {
    await reContinueProductsMutation.mutateAsync({ Products: [id] });
  };

  return {
    handleDiscontinueProducts,
    handleReContinueProducts,
  };
};

export const userMutations = () => {
  const blockUserMutation = useApiMutation(
    ApiURLS.BlockUsers.url,
    ApiURLS.BlockUsers.method
  );

  const unBlockUserMutation = useApiMutation(
    ApiURLS.UnblockUsers.url,
    ApiURLS.UnblockUsers.method
  );

  const handleBlockUser = async (id) => {
    await blockUserMutation.mutateAsync({ userIds: [id] });
  };

  const handleUnBlockUser = async (id) => {
    await unBlockUserMutation.mutateAsync({ userIds: [id] });
  };

  return {
    handleBlockUser,
    handleUnBlockUser,
  };
};
