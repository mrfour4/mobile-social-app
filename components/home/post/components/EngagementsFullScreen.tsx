import { View, Text, useColorScheme, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import {
  ActivityUnfocused,
  HeartUnfocused,
  HeartsFocused,
  Love,
  MessageUnfocused,
  MessagesIcon,
  ShareUnfocused,
} from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";
import {
  useLazyLikePostQuery,
  useLazyRepostQuery,
} from "../../../../redux/api/services";
import CommentButton from "./CommentButton";
import RepostButton from "./RepostButton";
import EngagementsText from "../misc/EngagementText";

export default function EngagementsFullScreen({
  title,
  like,
  comments,
  isLiked,
  id,
  isReposted,
  handleShare,
}: {
  title?: string;
  like: number;
  comments?: number;
  id: string;
  isLiked: boolean;
  isReposted: boolean;
  handleShare: () => void;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const [reposted, setRepost] = useState(() => isReposted);
  const [likeAmount, setLikeAmount] = useState(() => like);
  console.log(likeAmount)
  const [clicked, setClicked] = useState(() => isLiked);
  const [clickedComment, setClickedComment] = useState(false);
  const [likePost] = useLazyLikePostQuery();
  const shareColor = isDark ? "#91EC09" : "#639E0B";
  const handleClicked = (click: boolean) => {
    console.log(click);
    setClicked(click);
    likePost({ id });
    if (click) {
      setLikeAmount(likeAmount + 1);
    } else {
      setLikeAmount(likeAmount - 1);
    }
  };
  const handleClickComment = () => {
    setClickedComment(!clickedComment);
  };

  const [rePostPost] = useLazyRepostQuery();

  const handleRepost = (repost: boolean) => {
    setRepost(repost);
    rePostPost({ id });
  };

  const color = isDark ? "white" : "black";
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          marginVertical: 10,
          paddingVertical: 10,
          borderTopColor: '#7a868f',
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          borderBottomColor: '#7a868f',
        }}
      >
        <EngagementsText engagementNumber={likeAmount} engage="Like" />
        <EngagementsText engagementNumber={comments || 0} engage="Comment" />
      </View>
      <View style={{}}>
        {title && <Text>{title}</Text>}
        <View></View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,

            alignItems: 'center',

            gap: 6,
            justifyContent: 'space-between',
          }}
        >
          {/* <IconWithValue
        animationRef={animationRef}
          IconUnfocused={MessageUnfocused}
          text={comments?.toString() || "0"}
          IconFocused={MessageUnfocused}
          clicked={clicked}
          setClicked={handleClicked}
        /> */}
          <CommentButton
            setClicked={handleClickComment}
            clicked={clickedComment}
          />
          <LikeButton
            isLiked={isLiked}
            clicked={clicked}
            setClicked={handleClicked}
          />
          <RepostButton
            isPosted={isReposted}
            clicked={reposted}
            setReposted={handleRepost}
          />
          <Pressable onPress={handleShare}>
            <ShareUnfocused size={20} color={shareColor} />
          </Pressable>
        </View>
      </View>
    </>
  );
}
